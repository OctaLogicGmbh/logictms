import { ErrorResponse, Link, useRouteError } from 'react-router-dom';

function isErrorResponse(error: ErrorResponse | Error): error is ErrorResponse {
  return (error as ErrorResponse).statusText !== undefined;
}

export default function ErrorPage() {
  const error = useRouteError() as ErrorResponse | Error;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1>Oops!</h1>
      <h4>Sorry, an unexpected error has occurred.</h4>
      <i>{isErrorResponse(error) ? error.statusText : error.message}</i>
      <br />
      <div className="p-4">
        <Link to="/" className="hover:underline">
          Go to Home Page
        </Link>
      </div>
    </div>
  );
}
