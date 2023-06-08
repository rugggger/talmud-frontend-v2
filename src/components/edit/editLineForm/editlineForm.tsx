import React, { useState } from 'react';
import * as Yup from 'yup';
import { withFormik, FormikProps, Form, FormikValues } from 'formik';
import { EditorState, ContentState } from 'draft-js';
import SourceButtons from '../MainLineEditor/SourceButtons';
import LineService from '../../../services/line.service';
import { iLine, iInternalLink, iMishna, iSubline, iSynopsis } from '../../../types/types';
import { getTextForSynopsis } from '../../../inc/synopsisUtils';
import { Button } from '@mui/material';
import FieldSublines from './FieldSublines';

interface Props {
  line: iLine | null;
  currentMishna: iMishna;
}

const allowedSourcesForInitialText = ['leiden', 'dfus_rishon'];

const formikEnhancer = withFormik({
  mapPropsToValues: (props: Props) => {
    const { line } = props;
    const textForEditor = line?.sublines
      ? line.sublines
          .map((s) => s.text)
          .join('\n')
          .replace(/^\s+|\s+$/g, '') // trim new lines
      : line?.mainLine;

    return {
      mainLine: EditorState.createWithContent(ContentState.createFromText(textForEditor || '')),
      sublines: line?.sublines || [],
      parallels: line?.parallels || []
    };
  },
  validationSchema: Yup.object().shape({
    // email: Yup.string().email("That's not an email").required("Required!"),
  }),
  handleSubmit: (values, formProps) => {
    const { setSubmitting, props } = formProps;
    const { currentMishna, line } = props;
    LineService.saveLine(currentMishna.tractate, currentMishna.chapter, currentMishna.mishna, line!.lineNumber!, {
      ...values,
    });

    setTimeout(() => {
      // you probably want to transform draftjs state to something else, but I'll leave that to you.
      console.log('submitted ', values);
      // alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: 'MyForm',
  enableReinitialize: true,
});

// Shape of form values
interface FormValues {
  sublines: iSubline[];
}

interface OtherProps {
  message: string;
  currentMishna: iMishna;
}
interface Props {
  props: FormikProps<FormValues>;
}
const EditLineForm = (props: FormikValues) => {
  const {
    values,
    touched,
    dirty,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    setFieldValue,
    isSubmitting,
    line,
    currentMishna,
  } = props;
  const [sources, setSources] = useState<iSynopsis[]>([]);
  const onUpdateInternalSources = (parallels: iInternalLink[]) => {
    setFieldValue('parallels', parallels)
  }
  const onAddExternalSource = (source) => {
    console.log('ADD', source);
    setSources([...sources, source]);
  };
  const onRemoveSource = (id) => {
    const index = sources.findIndex((s) => s.id === id);
    sources.splice(index, 1);
    setSources([...sources]);
    values.sublines.forEach((subline) => {
      const indexToRemove = subline.synopsis.findIndex((s) => s.id === id);
      subline.synopsis.splice(indexToRemove, 1);
    });
    setFieldValue('sublines', values.sublines);
  };
  const onAddSource = (source: iSynopsis) => {
    values.sublines.forEach((subline: iSubline) => {
      let addedSynopsis: iSynopsis = {
        ...source,
      };
      if (allowedSourcesForInitialText.includes(source.id)) {
        addedSynopsis.text = { simpleText: getTextForSynopsis(subline.text, source) };
      } else {
        addedSynopsis.text = { simpleText: "" };
      }
      subline.synopsis.push(addedSynopsis);
    });
    setFieldValue('sublines', values.sublines);
  };
  return (
    <Form>
      <SourceButtons
        line={line}
        currentMishna={currentMishna}
        sources={values.sublines}
        parallels={values.parallels}
        onAddSource={(source: iSynopsis) => onAddSource(source)}
        onRemoveSource={(id) => onRemoveSource(id)}
        onAddExternalSource={onAddExternalSource}
        onUpdateInternalSources={onUpdateInternalSources}
        ></SourceButtons>
      <FieldSublines 
      sublines={values.sublines}
      onRemoveSource={onRemoveSource} />

      <Button type="submit" disabled={isSubmitting}>שמור</Button>
    </Form>
  );
};
export default formikEnhancer(EditLineForm);
