import * as t from '@babel/types';
import type { ValidationResult } from './validator';
import { parseSFC, transformScript } from '../shared';
import { VantIcons, defaultVantIcon, defaultVtjIcon } from './icons';
import { checkAndFixStatePrefix } from './state';
export class AutoFixer {
  fixBasedOnValidation(code: string, validation: ValidationResult) {
    let fixedCode = code;

    if (validation.illegalVantIcons.length) {
      fixedCode = this.fixVantIcons(fixedCode);
    }

    if (validation.illegalVtjIcons.length) {
      fixedCode = this.fixVtjIcons(fixedCode, validation.illegalVtjIcons);
    }

    return checkAndFixStatePrefix(fixedCode).fixedCode;
  }

  private fixVantIcons(code: string): string {
    const sfc = parseSFC(code);
    const template = sfc.template.replace(
      /<(?:VanIcon|van-icon)\s+[^>]*name="([^"]+)"[^>]*>/g,
      (match, iconName) => {
        return VantIcons.includes(iconName)
          ? match
          : match.replace(iconName, defaultVantIcon);
      }
    );
    return this.reconstructSFC(sfc, template, sfc.script);
  }

  private fixVtjIcons(code: string, illegal: string[] = []) {
    const sfc = parseSFC(code);
    sfc.script = transformScript(sfc.script, {
      ImportDeclaration(path: any) {
        if (path.node.source.value === '@vtj/icons') {
          const specifiers = path.node.specifiers;
          const newSpecifiers: any[] = [];
          let hasDefault = false;
          for (const specifier of specifiers) {
            const name = specifier.imported?.name;
            if (name === defaultVtjIcon) {
              hasDefault = true;
            }
            if (!illegal.includes(name)) {
              newSpecifiers.push(
                t.importSpecifier(specifier.local, specifier.imported)
              );
            }
          }
          if (!hasDefault) {
            newSpecifiers.push(
              t.importSpecifier(
                t.identifier(defaultVtjIcon),
                t.identifier(defaultVtjIcon)
              )
            );
          }
          path.node.specifiers = newSpecifiers;
        }
      },
      ObjectMethod(path: any) {
        if (path.node.key.name === 'setup') {
          const body = path.node.body.body;
          for (const node of body) {
            if (
              t.isReturnStatement(node) &&
              t.isObjectExpression(node.argument)
            ) {
              const properties = node.argument.properties || [];
              node.argument.properties = properties.filter(
                (n: any) => !illegal.includes(n.key.name)
              );
              node.argument.properties.push(
                t.objectProperty(
                  t.identifier(defaultVtjIcon),
                  t.identifier(defaultVtjIcon),
                  false,
                  true
                )
              );
            }
          }
        }
      },
      ObjectProperty(path) {
        if (t.isIdentifier(path.node.value)) {
          if (illegal.includes(path.node.value.name)) {
            path.node.value = t.identifier(defaultVtjIcon);
          }
        }
        if (t.isArrayExpression(path.node.value)) {
          const elements = path.node.value.elements;
          path.node.value.elements = elements.map((n) => {
            if (t.isIdentifier(n) && illegal.includes(n.name)) {
              return t.identifier(defaultVtjIcon);
            }
            return n;
          });
        }
      },
      AssignmentExpression(path) {
        if (t.isIdentifier(path.node.right)) {
          if (illegal.includes(path.node.right.name)) {
            path.node.right = t.identifier(defaultVtjIcon);
          }
        }
      }
    });

    const regexp = /:icon\s*=\s*["']([^"']+)["']/g;
    const matches = sfc.template.match(regexp);
    if (matches) {
      for (const match of matches) {
        let result = match;
        for (const item of illegal) {
          result = result.replace(new RegExp(item, 'g'), defaultVtjIcon);
        }
        sfc.template = sfc.template.replace(match, result);
      }
    }

    for (const item of illegal) {
      sfc.template = sfc.template.replace(
        new RegExp(`:icon="${item}"`, 'g'),
        `:icon="${defaultVtjIcon}"`
      );
    }

    return this.reconstructSFC(sfc, sfc.template, sfc.script);
  }

  private reconstructSFC(
    sfc: ReturnType<typeof parseSFC>,
    newTemplate?: string,
    newScript?: string
  ): string {
    let output = '';
    if (newTemplate && sfc.template) {
      output += `<template>\n${newTemplate}\n</template>\n\n`;
    }
    if (newScript && sfc.script) {
      output += `<script>\n${newScript}\n</script>\n\n`;
    }
    sfc.styles.forEach((style) => {
      output += `<style lang="scss" scoped>\n`;
      output += `${style}\n`;
      output += `</style>\n\n`;
    });

    return output;
  }
}
