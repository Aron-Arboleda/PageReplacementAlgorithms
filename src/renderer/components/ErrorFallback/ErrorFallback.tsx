import Button from '@components/Button/Button';
import { LargeContainer } from '@components/Containers/Containers';
import Main from '@components/Containers/Main';
import { BodyTitle } from '@components/Texts/Texts';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Main>
      <LargeContainer>
        <div className="headingContainer">
          <BodyTitle title={'Something went wrong:'} />
        </div>
        <p>Error message: {error.message}</p>
        <Button text={'Try again'} onClick={resetErrorBoundary} />
      </LargeContainer>
    </Main>
  );
}

export default ErrorFallback;
