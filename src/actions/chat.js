import { useMemo } from 'react';
import { keyBy } from 'es-toolkit';
import useSWR, { mutate } from 'swr';

import axios, { fetcher, endpoints } from 'src/lib/axios';

// ----------------------------------------------------------------------

const enableServer = false;

const CHAT_ENDPOINT = endpoints.chat;

const swrOptions = {
  revalidateIfStale: enableServer,
  revalidateOnFocus: enableServer,
  revalidateOnReconnect: enableServer,
};

// ----------------------------------------------------------------------

export function useGetContacts() {
  const url = [CHAT_ENDPOINT, { params: { endpoint: 'contacts' } }];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
  });

  const memoizedValue = useMemo(
    () => ({
      contacts: data?.contacts || [],
      contactsLoading: isLoading,
      contactsError: error,
      contactsValidating: isValidating,
      contactsEmpty: !isLoading && !isValidating && !data?.contacts.length,
    }),
    [data?.contacts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetConversations() {
  const url = [CHAT_ENDPOINT, { params: { endpoint: 'conversations' } }];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
  });

  const memoizedValue = useMemo(() => {
    const byId = data?.conversations.length ? keyBy(data.conversations, (option) => option.id) : {};
    const allIds = Object.keys(byId);

    return {
      conversations: { byId, allIds },
      conversationsLoading: isLoading,
      conversationsError: error,
      conversationsValidating: isValidating,
      conversationsEmpty: !isLoading && !isValidating && !allIds.length,
    };
  }, [data?.conversations, error, isLoading, isValidating]);

  return memoizedValue;
}

export function useGetConversation(conversationId) {
  const url = conversationId
    ? [
        CHAT_ENDPOINT,
        {
          params: {
            conversationId: `${conversationId}`,
            endpoint: 'conversation',
          },
        },
      ]
    : '';

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
  });

  const memoizedValue = useMemo(
    () => ({
      conversation: data?.conversation,
      conversationLoading: isLoading,
      conversationError: error,
      conversationValidating: isValidating,
      conversationEmpty: !isLoading && !isValidating && !data?.conversation,
    }),
    [data?.conversation, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function sendMessage(conversationId, messageData) {
  const conversationsUrl = [CHAT_ENDPOINT, { params: { endpoint: 'conversations' } }];

  const conversationUrl = [CHAT_ENDPOINT, { params: { conversationId, endpoint: 'conversation' } }];

  /**
   * Work on server
   */
  if (enableServer) {
    const data = { conversationId, messageData };
    await axios.put(CHAT_ENDPOINT, data);
  }

  /**
   * Work in local
   */
  mutate(
    conversationUrl,
    (currentData) => {
      const currentConversation = currentData.conversation;

      const conversation = {
        ...currentConversation,
        messages: [...currentConversation.messages, messageData],
      };

      return { ...currentData, conversation };
    },
    false
  );

  mutate(
    conversationsUrl,
    (currentData) => {
      const currentConversations = currentData.conversations;

      const conversations = currentConversations.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              messages: [...conversation.messages, messageData],
            }
          : conversation
      );

      return { ...currentData, conversations };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function createConversation(conversationData) {
  const url = [CHAT_ENDPOINT, { params: { endpoint: 'conversations' } }];

  /**
   * Work on server
   */
  const data = { conversationData };
  const res = await axios.post(CHAT_ENDPOINT, data);

  /**
   * Work in local
   */
  mutate(
    url,
    (currentData) => {
      const currentConversations = currentData.conversations;

      const conversations = [...currentConversations, conversationData];

      return { ...currentData, conversations };
    },
    false
  );

  return res.data;
}

// ----------------------------------------------------------------------

export async function clickConversation(conversationId) {
  /**
   * Work on server
   */
  if (enableServer) {
    await axios.get(CHAT_ENDPOINT, {
      params: { conversationId, endpoint: 'mark-as-seen' },
    });
  }

  /**
   * Work in local
   */
  mutate(
    [CHAT_ENDPOINT, { params: { endpoint: 'conversations' } }],
    (currentData) => {
      const currentConversations = currentData.conversations;

      const conversations = currentConversations.map((conversation) =>
        conversation.id === conversationId ? { ...conversation, unreadCount: 0 } : conversation
      );

      return { ...currentData, conversations };
    },
    false
  );
}
