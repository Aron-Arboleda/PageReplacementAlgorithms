import { FieldButton } from '@components/Button/Button';
import {
  CardContainer,
  GridContainerFixed,
  LargeContainer,
} from '@components/Containers/Containers';
import Main from '@components/Containers/Main';
import { BodyTitle } from '@components/Texts/Texts';
import {
  generateRandomNumberString,
  handleNumericInput,
  handleNumericPaste,
} from '@utils/helpers/helpers';
import { Box, Copy } from 'lucide-react';
import { useRef } from 'react';
import { SubmitHandler, useController, useForm } from 'react-hook-form';

export interface ComputationInputs {
  referenceString: string;
  numberOfFrames: number;
}

const defaultValuesForInputs = {
  referenceString: '7,3,2,3,8,5,4,3,6,8,9,7,5,4,3,6,8',
  numberOfFrames: 3,
};

const ComputationPage = () => {
  // const { generalInfo, setGeneralInfo, isDisabled, setIsDisabled } =
  //   useGeneralInfo();
  // const { footing, setFooting } = useFooting();
  // const { columns, setColumns } = useColumns();
  // // const { slab } = useSlab();
  // const { beam, setBeam } = useBeam();
  // const [values, setValues] = useState<GeneralInfo | null>(null);
  // const navigate = useNavigate();

  // const inputsDefaultValues = generalInfo
  //   ? generalInfo
  //   : defaultValuesForInputs;

  // useEffect(() => {
  //   if (generalInfo) {
  //     setValues(generalInfo);
  //   }
  // }, [generalInfo]);

  const referenceStringRef = useRef<HTMLTextAreaElement>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ComputationInputs>({
    defaultValues: defaultValuesForInputs,
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
    try {
    } catch (error) {}
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
        <form>
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
              <CardContainer title="Inputs">
                <div className="inputField">
                  <label htmlFor="referenceString">Reference String</label>
                  <div className="field">
                    <div className="fieldActionButtons">
                      <FieldButton onClick={handleGenerateRandom} Icon={Box} />
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
                      <span className="error">{fieldState.error.message}</span>
                    )}
                  </div>
                </div>
                <div className="inputField">
                  <label htmlFor="numberOfFrames">Number of Frames</label>
                  <input
                    type="number"
                    id="numberOfFrames"
                    min={1}
                    {...register('numberOfFrames', {
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
                  {errors.numberOfFrames && (
                    <span className="error">
                      {errors.numberOfFrames.message}
                    </span>
                  )}
                </div>
              </CardContainer>
              <div></div>
            </GridContainerFixed>
          </div>
        </form>
      </LargeContainer>
    </Main>
  );
};

export default ComputationPage;
