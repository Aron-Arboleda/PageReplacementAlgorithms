import Button, { FieldButton } from '@components/Button/Button';
import {
  CardContainer,
  GridContainerFixed,
  LargeContainer,
} from '@components/Containers/Containers';
import Main from '@components/Containers/Main';
import { BodyTitle, InfoLabel, InfoValue } from '@components/Texts/Texts';
import { Results } from '@utils/helpers/classes/results';

import {
  generateRandomNumberString,
  handleNumericInput,
  handleNumericPaste,
} from '@utils/helpers/helpers';
import { computeResultsSeparate } from '@utils/workers/computationThreads/index.js';
import { Box, Copy, Loader } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useController, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useComputing } from 'src/renderer/contexts/ComputingContext';
import { useResults } from 'src/renderer/contexts/ResultsContext';

export interface ComputationInputs {
  referenceString: string;
  noOfFrames: number;
}

const defaultValuesForInputs = {
  referenceString: '7,3,2,3,8,5,4,3,6,8,9,7,5,4,3,6,8',
  noOfFrames: 3,
};

const ComputationPage = () => {
  const [isCalculating, setIsCalculating] = useState(false);
  const { setComputing } = useComputing();
  const { resultsGeneral, setResultsGeneral } = useResults();

  const [results, setResults] = useState<Results | null>(null);
  const referenceStringRef = useRef<HTMLTextAreaElement>(null);

  const inputsDefaultValues = resultsGeneral
    ? resultsGeneral
    : defaultValuesForInputs;

  useEffect(() => {
    if (resultsGeneral) {
      setResults(resultsGeneral);
    }
  }, [resultsGeneral]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ComputationInputs>({
    defaultValues: inputsDefaultValues,
  });

  const { field, fieldState } = useController({
    name: 'referenceString',
    rules: {
      required: 'Reference String is required',
      pattern: {
        value: /^[0-9,\s]+$/,
        message: 'Invalid reference string format',
      },
    },
    control,
  });

  const onSubmit: SubmitHandler<ComputationInputs> = async (data) => {
    setIsCalculating(true);
    setComputing(true);

    try {
      computeResultsSeparate(data).then((results) => {
        const resultsObj = JSON.parse(results).results;

        const resultsInstance = new Results();
        resultsInstance.assignValues(resultsObj);

        setResults(resultsInstance);
        setResultsGeneral(resultsInstance);
        setIsCalculating(false);
        setComputing(false);
        toast.success('Results successfully calculated.', {
          autoClose: 2000,
        });
      });
    } catch (error) {
      toast.error(
        'Page Replacement Algorithms execution error: "' + error + '"',
      );
      setResults(null);
      setResultsGeneral(null);
      setIsCalculating(false);
      setComputing(false);
    }
  };

  const handleGenerateRandom = () => {
    const randomString = generateRandomNumberString();
    setValue('referenceString', randomString);

    // resize textarea
    setTimeout(() => {
      if (referenceStringRef.current) {
        referenceStringRef.current.style.height = 'auto';
        referenceStringRef.current.style.height = `${referenceStringRef.current.scrollHeight}px`;
      }
    }, 0);
  };

  const handleCopyReferenceString = () => {
    const referenceString = watch('referenceString'); // Get the current value of the reference string
    navigator.clipboard.writeText(referenceString); // Copy it to the clipboard
  };

  return (
    <Main>
      <LargeContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="headingContainer">
            <BodyTitle title={'Page Replacement Algorithms:'} />
          </div>
          <div className="bodyContainer">
            <GridContainerFixed
              style={{
                display: 'grid',
                gridTemplateColumns: '20% 1fr',
                gap: '2rem',
              }}
            >
              <div>
                <CardContainer title="Inputs">
                  <div className="inputField">
                    <label htmlFor="referenceString">Reference String</label>
                    <div className="field">
                      <div className="fieldActionButtons">
                        <FieldButton
                          onClick={handleGenerateRandom}
                          Icon={Box}
                        />
                        <FieldButton
                          onClick={handleCopyReferenceString}
                          Icon={Copy}
                        />
                      </div>
                      <textarea
                        id="referenceString"
                        className="fieldInside"
                        rows={1}
                        ref={(e) => {
                          referenceStringRef.current = e; // your custom ref
                          field.ref(e); // hook form ref
                        }}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e); // make sure form state updates
                          const target = e.target as HTMLTextAreaElement;
                          target.style.height = 'auto';
                          target.style.height = `${target.scrollHeight}px`;
                        }}
                        onBlur={field.onBlur}
                      />
                      {fieldState.error && (
                        <span className="error">
                          {fieldState.error.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="inputField">
                    <label htmlFor="noOfFrames">Number of Frames</label>
                    <input
                      type="number"
                      id="noOfFrames"
                      min={1}
                      {...register('noOfFrames', {
                        required: 'Number of columns is required',
                        min: {
                          value: 1,
                          message: 'At least one column is required',
                        },
                        valueAsNumber: true,
                      })}
                      onKeyDown={handleNumericInput}
                      onPaste={handleNumericPaste}
                    />
                    {errors.noOfFrames && (
                      <span className="error">{errors.noOfFrames.message}</span>
                    )}
                  </div>
                </CardContainer>
                <div className="calculateButtonContainer">
                  <Button
                    text={isCalculating ? 'Calculating...' : 'Calculate'}
                    disabled={isCalculating}
                    className={isCalculating ? 'disabled' : ''}
                    icon={
                      isCalculating ? (
                        <Loader className="spinner" size={12} />
                      ) : undefined
                    }
                    type="submit"
                    style={{ width: '80%' }}
                  />
                </div>
              </div>
              <CardContainer title="Output">
                {isCalculating && (
                  <div className="loading-container">
                    <Loader className="spinner" size={32} />
                    <p>Calculating results...</p>
                  </div>
                )}
                {!isCalculating && !results && (
                  <p>Fill in the form and click "Calculate" to see results.</p>
                )}
                {!isCalculating && results && (
                  <GridContainerFixed
                    style={{
                      gap: '0.1rem',
                      gridTemplateColumns: '13% 1fr',
                    }}
                  >
                    <InfoLabel label="Reference String:" />
                    <InfoValue value={results.referenceString} />
                    <InfoLabel label="Number of Frames:" />
                    <InfoValue value={results.noOfFrames} />
                  </GridContainerFixed>
                )}
                <div></div>
              </CardContainer>
            </GridContainerFixed>
          </div>
        </form>
      </LargeContainer>
    </Main>
  );
};

export default ComputationPage;
