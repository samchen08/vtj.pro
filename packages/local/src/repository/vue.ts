import { resolve, join, dirname } from 'path';
import {
  pathExistsSync,
  removeSync,
  outputFileSync,
  ensureFileSync,
  ensureDirSync
} from '@vtj/node';
import * as fs from 'fs';

import type { PlatformType, ProjectSchema } from '@vtj/core';

export class VueRepository {
  private path: string;
  private projectConfig: {
    enabled: boolean;
    path?: string;
    configPath?: string; // 项目配置文件路径
  } = { enabled: false };

  constructor(
    platform: PlatformType = 'web',
    projectConfig?: {
      enabled: boolean;
      path?: string;
      configPath?: string; // 项目配置文件路径
    }
  ) {
    const dir = platform === 'uniapp' ? 'src/pages' : '.vtj/vue';
    this.path = resolve(dir);

    if (projectConfig) {
      this.projectConfig = projectConfig;
    }
  }

  /**
   * 获取项目文件保存路径
   * 根据项目结构动态计算文件的保存路径
   * @param project 项目配置
   * @param fileId 文件ID
   * @param forceRefresh 是否强制刷新项目配置
   * @returns 文件保存路径或null
   */
  getProjectSavePath(project: ProjectSchema, fileId: string, forceRefresh: boolean = false): string | null {
    if (!this.projectConfig.enabled || !this.projectConfig.path) {
      return null;
    }

    // 从项目配置中解析保存路径
    const customPath = this.projectConfig.path;
    const basePath = resolve(customPath);

    // 查找文件信息
    const file = project.pages?.find(p => p.id === fileId) ||
                project.blocks?.find(b => b.id === fileId);

    if (!file) {
      return null;
    }
    
    // 尝试从文件名推断目录结构
    // 例如：Sysindex -> Sys, Elderindex -> Elder, Aindex -> A, Bindex -> B
    const fileName = file.name;
    const match = fileName.match(/^([A-Z][a-z]+)index$/);
    
    if (match) {
      const dirName = match[1].toLowerCase(); // 提取目录名并转为小写
      return join(basePath, dirName, `${fileName.toLowerCase()}.vue`);
    }
    
    // 尝试从vtj-project-app.json文件中读取完整的项目结构
    // 如果forceRefresh为true，则强制重新读取文件
    try {
      // 使用固定的配置路径
      const configPath = resolve('./.vtj/projects/vtj-project-app.json');
      
      // 检查配置文件是否存在
      if (!pathExistsSync(configPath)) {
        throw new Error('未找到项目配置文件');
      }
      
      // 读取配置文件内容
      const projectJsonContent = fs.readFileSync(configPath, 'utf8');
      
      // 解析JSON内容
      const projectJson = JSON.parse(projectJsonContent);
        
        if (projectJson && projectJson.pages) {
          
          // 递归查找文件
          const findItemById = (items: Array<any>, id: string): any => {
            if (!items || !Array.isArray(items)) return null;
            
            for (const item of items) {
              if (!item) continue;
              if (item.id === id) return item;
              
              if (item.dir === true && item.children) {
                const found = findItemById(item.children, id);
                if (found) return found;
              }
            }
            return null;
          };
          
          // 构建父子关系映射
          const buildParentMap = (items: Array<any>): Map<string, any> => {
            const parentMap = new Map<string, any>();
            
            const processItems = (items: Array<any>) => {
              if (!items || !Array.isArray(items)) return;
              
              for (const item of items) {
                if (!item) continue;
                
                if (item.dir === true && item.children && Array.isArray(item.children)) {
                  for (const child of item.children) {
                    if (!child) continue;
                    parentMap.set(child.id, item);
                  }
                  
                  // 递归处理子目录
                  processItems(item.children);
                }
              }
            };
            
            processItems(items);
            return parentMap;
          };
          
          // 构建从文件到根目录的路径
          const buildPathFromFileToRoot = (items: Array<any>, targetId: string): string[] => {
            // 构建父子关系映射
            const parentMap = buildParentMap(items);
            
            // 查找目标文件
            const targetItem = findItemById(items, targetId);
            if (!targetItem) {
              return [];
            }
            
            // 从目标文件开始，向上查找父级目录
            const path: string[] = [];
            let currentId = targetId;
            
            // 添加目标文件名
            path.unshift(targetItem.name);
            
            // 向上查找父级目录
            while (parentMap.has(currentId)) {
              const parent = parentMap.get(currentId);
              path.unshift(parent.name);
              currentId = parent.id;
            }
            
            return path;
          };
          
          // 构建父子关系映射并获取路径
          const pathParts = buildPathFromFileToRoot(projectJson.pages, fileId);
          
          if (pathParts.length > 0) {
            // 最后一个元素是文件名，转为小写
            const fileName = pathParts[pathParts.length - 1].toLowerCase();
            
            if (pathParts.length > 1) {
              // 有目录结构，构建目录路径，目录名转为小写
              const dirPath = pathParts.slice(0, -1).map(part => part.toLowerCase()).join('/');
              return join(basePath, dirPath, `${fileName}.vue`);
            } else {
              // 没有目录结构，直接在根目录下，文件名转为小写
              return join(basePath, `${fileName}.vue`);
            }
          }
        }
    } catch (error: any) {
      // 错误已处理，继续尝试其他方法
    }
    
    // 如果无法从项目配置文件中解析路径，尝试使用传入的project参数
    if (project.pages && Array.isArray(project.pages)) {
      
      // 递归查找文件
      const findItemById = (items: Array<any>, id: string): any => {
        if (!items || !Array.isArray(items)) return null;
        
        for (const item of items) {
          if (!item) continue;
          if (item.id === id) return item;
          
          if (item.dir === true && item.children) {
            const found = findItemById(item.children, id);
            if (found) return found;
          }
        }
        return null;
      };
      
      // 构建父子关系映射
      const buildParentMap = (items: Array<any>): Map<string, any> => {
        const parentMap = new Map<string, any>();
        
        const processItems = (items: Array<any>) => {
          if (!items || !Array.isArray(items)) return;
          
          for (const item of items) {
            if (!item) continue;
            
            if (item.dir === true && item.children && Array.isArray(item.children)) {
              for (const child of item.children) {
                if (!child) continue;
                parentMap.set(child.id, item);
              }
              
              // 递归处理子目录
              processItems(item.children);
            }
          }
        };
        
        processItems(items);
        return parentMap;
      };
      
      // 构建从文件到根目录的路径
      const buildPathFromFileToRoot = (items: Array<any>, targetId: string): string[] => {
        // 构建父子关系映射
        const parentMap = buildParentMap(items);
        
        // 查找目标文件
        const targetItem = findItemById(items, targetId);
        if (!targetItem) {
          return [];
        }
        
        // 从目标文件开始，向上查找父级目录
        const path: string[] = [];
        let currentId = targetId;
        
        // 添加目标文件名
        path.unshift(targetItem.name);
        
        // 向上查找父级目录
        while (parentMap.has(currentId)) {
          const parent = parentMap.get(currentId);
          path.unshift(parent.name);
          currentId = parent.id;
        }
        
        return path;
      };
      
      // 构建父子关系映射并获取路径
      const pathParts = buildPathFromFileToRoot(project.pages, fileId);
      
      if (pathParts.length > 0) {
        // 最后一个元素是文件名，转为小写
        const fileName = pathParts[pathParts.length - 1].toLowerCase();
        
        if (pathParts.length > 1) {
          // 有目录结构，构建目录路径，目录名转为小写
          const dirPath = pathParts.slice(0, -1).map(part => part.toLowerCase()).join('/');
          return join(basePath, dirPath, `${fileName}.vue`);
        } else {
          // 没有目录结构，直接在根目录下，文件名转为小写
          return join(basePath, `${fileName}.vue`);
        }
      }
    }
    
    // 文件ID是随机生成的，不使用预定义映射
    
    // 如果所有方法都失败，使用默认的文件名，转为小写
    return join(basePath, `${file.name.toLowerCase()}.vue`);
  }

  exist(name: string) {
    const filePath = join(this.path, `${name}.vue`);
    return pathExistsSync(filePath);
  }
  /**
   * 保存Vue文件
   * 将文件保存到默认路径和项目自定义路径（如果启用）
   * @param name 文件ID
   * @param content 文件内容
   * @param project 项目配置
   * @returns 是否保存成功
   */
  save(name: string, content: any, project?: ProjectSchema) {
    // 保存到默认路径
    const filePath = join(this.path, `${name}.vue`);
    if (!this.exist(name)) {
      ensureFileSync(filePath);
    }
    outputFileSync(filePath, content, 'utf-8');

    // 如果启用了项目自定义保存，则同时保存到项目路径
    if (project && this.projectConfig.enabled && this.projectConfig.path) {
      try {
        // 使用getProjectSavePath方法获取完整路径，强制刷新项目配置
        const projectPath = this.getProjectSavePath(project, name, true);
        
        if (projectPath) {
          // 确保目标目录存在
          const dirPath = dirname(projectPath);
          ensureDirSync(dirPath);
          
          // 保存文件
          outputFileSync(projectPath, content, 'utf-8');
        }
      } catch (error) {
        // 错误已处理
      }
    }

    return true;
  }
  remove(name: string) {
    const filePath = join(this.path, `${name}.vue`);
    if (pathExistsSync(filePath)) {
      removeSync(filePath);
      return true;
    }
    return false;
  }
  clear() {
    if (pathExistsSync(this.path)) {
      removeSync(this.path);
      return true;
    }
    return false;
  }
}
