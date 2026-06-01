// Layout
export { ChatCanvasLayout, ResizeHandle } from './chat-canvas-layout';

// Chat components
export {
  ChatMessage,
  chatMessageVariants,
  MessageList,
  MessageListEmpty,
  ChatInput,
  StreamingText,
  StreamingCursor,
  useStreamingText,
  SuggestionChips,
  ConfirmationMessage,
  SlashCommandMenu,
  useSlashCommands,
  EntityPicker,
  useEntityPicker,
  CalendarPicker,
  useCalendarPicker,
  formatDate,
} from './chat';
export type {
  ChatMessageProps,
  Message,
  MessageListProps,
  ChatInputProps,
  StreamingTextProps,
  Suggestion,
  SuggestionChipsProps,
  ConfirmationMessageProps,
  ParsedField,
  SlashCommand,
  SlashCommandMenuProps,
  Entity,
  EntityType,
  EntityPickerProps,
  CalendarPickerProps,
} from './chat';

// Canvas components
export {
  Artifact,
  artifactVariants,
  ArtifactSkeleton,
  ArtifactError,
  ChartArtifactContent,
  KPIArtifactContent,
  TableArtifactContent,
  CanvasEmpty,
} from './canvas';
export type {
  ArtifactProps,
  ArtifactData,
  ArtifactType,
  ArtifactStatus,
  ChartArtifactContentProps,
  PlotlyFigure,
  KPIArtifactContentProps,
  KPIItem,
  TableArtifactContentProps,
  TableColumn,
  CanvasEmptyProps,
} from './canvas';
