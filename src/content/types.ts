
type ContentFields = {
    [key: string]: ContentField;
  };

export interface Content {
    fields: ContentFields
}

interface ContentField {
  nodeType: string

}

export interface ContentDocument extends ContentField {
  content: ContentField[]
}

export interface ContentParagraphField extends ContentField {
  content: ContentField[]
}

export interface ContentTextField extends ContentField {
  value: string
}

export interface ContentHyperLinkField extends ContentField {
  content: ContentField[]
  data: {uri: string}
}

export interface ContentHeadingField extends ContentField {
  content: ContentField[]
}

export interface ContentHr extends ContentField {
}

export interface ContentEmbeddedAssetBlock extends ContentField {
  data: {
    target: {
      sys: {
        id: string;
        type: string;
        linkType: string;
      }
    }
  }

}

export function isFieldDocument(
  field: ContentField
): field is ContentDocument {
  return field.nodeType === "document"
}

export function isFieldParagraph(
  field: ContentField
): field is ContentParagraphField {
  return field.nodeType === "paragraph"
}

export function isFieldText(
  field: ContentField
): field is ContentTextField {
  return field.nodeType === "text"
}

export function isHyperlink(
  field: ContentField
): field is ContentHyperLinkField {
  return field.nodeType === "hyperlink"
}

export function isHeading(
  field: ContentField
): field is ContentHeadingField {
  return (["heading-1","heading-2","heading-3","heading-4","heading-5","heading-6"].findIndex((v)=>v===field.nodeType) !== -1)
}

export function isHR(
  field: ContentField
): field is ContentHr {
  return field.nodeType === "hr"
}

export function isEmbeddedAssetBlock(
  field: ContentField
): field is ContentEmbeddedAssetBlock {
  return field.nodeType === 'embedded-asset-block'
}