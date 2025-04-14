import { LargeContainer } from '@components/Containers/Containers';
import Main from '@components/Containers/Main';
import { BodyTitle } from '@components/Texts/Texts';
import { SubmitHandler } from 'react-hook-form';
import { FloorsWithFloorTypeType } from '@utils/helpers/classes/sampleClass';

export interface GeneralInfoFormInputs {
  projectLocation: string;
  floorsWithFloorType: FloorsWithFloorTypeType[];
  noOfFloors: number;
}

const defaultValuesForInputs = {
  noOfFloors: 4,
  floorsWithFloorType: [
    { floor: '1', floorType: 'Office' },
    { floor: '2', floorType: 'Office' },
    { floor: '3', floorType: 'Office' },
    { floor: '4', floorType: 'Office' },
  ],
  projectLocation: 'Bataan',
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

  // const {
  //   register,
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  //   watch,
  // } = useForm<GeneralInfoFormInputs>({
  //   defaultValues: defaultValuesForInputs,
  // });

  const onSubmit: SubmitHandler<GeneralInfoFormInputs> = async (data) => {
    try {
    } catch (error) {}
  };

  return (
    <Main>
      <LargeContainer>
        <form>
          <div className="headingContainer">
            <BodyTitle title={'Page Replacement Algorithms:'} />
          </div>
          <div className="bodyContainer"></div>
        </form>
      </LargeContainer>
    </Main>
  );
};

export default ComputationPage;
