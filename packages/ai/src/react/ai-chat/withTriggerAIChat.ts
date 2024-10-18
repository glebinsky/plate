import type { ExtendEditor } from '@udecode/plate-common/react';

import {
  type TElement,
  getAncestorNode,
  getEditorString,
  getPointBefore,
  getRange,
  isElementEmpty,
} from '@udecode/plate-common';

import type { AIChatPluginConfig } from './AIChatPlugin';

export const withTriggerAIChat: ExtendEditor<AIChatPluginConfig> = ({
  api,
  editor,
  getOptions,
}) => {
  const { insertText } = editor;

  const matchesTrigger = (text: string) => {
    const { trigger } = getOptions();

    if (trigger instanceof RegExp) {
      return trigger.test(text);
    }
    if (Array.isArray(trigger)) {
      return trigger.includes(text);
    }

    return text === trigger;
  };

  editor.insertText = (text) => {
    const { triggerPreviousCharPattern, triggerQuery } = getOptions();

    const fn = () => {
      if (
        !editor.selection ||
        !matchesTrigger(text) ||
        (triggerQuery && !triggerQuery(editor))
      ) {
        return;
      }

      // Make sure an input is created at the beginning of line or after a whitespace
      const previousChar = getEditorString(
        editor,
        getRange(
          editor,
          editor.selection,
          getPointBefore(editor, editor.selection)
        )
      );

      const matchesPreviousCharPattern =
        triggerPreviousCharPattern?.test(previousChar);

      if (!matchesPreviousCharPattern) return;

      const nodeEntry = getAncestorNode(editor);

      if (!nodeEntry || !isElementEmpty(editor, nodeEntry[0] as TElement))
        return;

      api.aiChat.show();

      return true;
    };

    if (fn()) return;

    return insertText(text);
  };

  return editor;
};