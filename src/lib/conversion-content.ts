export type FAQItem = {
  question: string;
  answer: string;
};

export type RelatedToolItem = {
  name: string;
  href: string;
};

export type ToolTextSection = {
  title: string;
  paragraphs: string[];
};

export type ToolListSection = {
  title: string;
  items: string[];
};

export type ToolComparisonItem = {
  label: string;
  value: string;
};

export type PageContent = {
  title: string;
  description: string;
  aboutTitle: string;
  aboutText: string;
  contentSections?: ToolTextSection[];
  listSections?: ToolListSection[];
  comparisonTitle?: string;
  comparisonItems?: ToolComparisonItem[];
  stepsTitle: string;
  steps: string[];
  faqTitle: string;
  faqs: FAQItem[];
  relatedTools: RelatedToolItem[];
  relatedToolsTitle?: string;
};

export type DetailUiText = {
  emptyTitle: string;
  unknownType: string;
  convertingStatus: string;
  canvasInitError: string;
  convertError: string;
  loadError: string;
  unexpectedErrorPrefix: string;
  successMessage: (baseName: string) => string;
  invalidFileError: string;
  selectedImageTitle: string;
  fileNameLabel: string;
  fileTypeLabel: string;
  fileSizeLabel: string;
  previewLabel: string;
  convertButton: string;
  convertingButton: string;
  resetButton?: string;
};

export type StandardImageConversionContent = {
  page: PageContent;
  ui: DetailUiText;
};
