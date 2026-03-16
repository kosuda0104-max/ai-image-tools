export type ToolLocale = "ja" | "en";

export type FAQItem = {
  question: string;
  answer: string;
};

export type RelatedToolItem = {
  name: string;
  href: string;
};

export type ToolPageContent = {
  title: string;
  description: string;
  aboutTitle: string;
  aboutText: string;
  stepsTitle: string;
  steps: string[];
  faqTitle: string;
  faqs: FAQItem[];
  relatedTools: RelatedToolItem[];
};

export type JpgToPngUiText = {
  emptyTitle: string;
  selectedImageTitle: string;
  fileNameLabel: string;
  fileTypeLabel: string;
  fileSizeLabel: string;
  previewLabel: string;
  convertButton: string;
  convertingButton: string;
  convertingStatus: string;
  invalidFileError: string;
  canvasInitError: string;
  convertError: string;
  loadError: string;
  unknownType: string;
  unexpectedErrorPrefix: string;
  successMessage: (fileName: string) => string;
};

export type JpgToPngContent = {
  page: ToolPageContent;
  ui: JpgToPngUiText;
};

export type ResizeImageUiText = {
  emptyTitle: string;

  selectedImageTitle: string;
  fileNameLabel: string;
  fileTypeLabel: string;
  fileSizeLabel: string;
  previewLabel: string;

  widthLabel: string;
  heightLabel: string;
  widthPlaceholder: string;
  heightPlaceholder: string;

  keepAspectRatioLabel: string;
  keepAspectRatioHint: string;

  resizeButton: string;
  resizingButton: string;
  resizingStatus: string;

  invalidFileError: string;
  validationNoSize: string;
  validationInvalidSize: string;
  validationInvalidResultSize: string;

  canvasInitError: string;
  resizeError: string;
  loadError: string;

  unknownType: string;
  unexpectedErrorPrefix: string;

  successMessage: string;
};

export type ResizeImageContent = {
  page: ToolPageContent;
  ui: ResizeImageUiText;
};