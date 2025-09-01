import type { App } from 'vue';
import type { I18nConfig } from '@vtj/core';

export function initI18n(
  app: App,
  libs: Record<string, any>,
  i18n?: I18nConfig
) {
  if (!app || !libs || !i18n) return;
  const { VueI18n } = libs;
  if (VueI18n) {
    const { locale, fallbackLocale, messages = [] } = i18n;
    const _messages: Record<string, any> = {};
    for (let message of messages) {
      const locales = Object.keys(message).filter((n) => n !== 'key');
      for (const locale of locales) {
        if (!_messages[locale]) {
          _messages[locale] = {};
        }
        _messages[locale][message.key] = message[locale];
      }
    }

    const plugin = VueI18n.createI18n({
      legacy: false,
      locale,
      fallbackLocale,
      messages: _messages
    });

    app.use(plugin);
  }
}
