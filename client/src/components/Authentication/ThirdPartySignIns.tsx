import { useAppDispatch } from "hooks";
import {
  loginWithFacebookOAuth,
  loginWithGoogleOAuth,
} from "slices/auth.slice";

export default function ThirdPartySignIns() {
  return (
    <>
      <div className="mt-6 flex justify-center relative">
        <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200" />
        <div className="text-gray-600 uppercase px-3 bg-white relative z-10">
          or login with
        </div>
      </div>
      <div className="mt-4 flex gap-4">
        <GoogleLoginBtn />
        <FacebookLoginBtn />
      </div>
    </>
  );
}

function GoogleLoginBtn() {
  const dispatch = useAppDispatch();
  return (
    <button
      className="block w-1/2 py-2 text-center text-white bg-yellow-600 rounded uppercase font-roboto font-medium text-sm hover:bg-yellow-500"
      onClick={() => dispatch(loginWithGoogleOAuth())}
    >
      Google
    </button>
  );
}

function FacebookLoginBtn() {
  const dispatch = useAppDispatch();
  return (
    <button
      className="block w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700"
      onClick={() => dispatch(loginWithFacebookOAuth())}
    >
      Facebook
    </button>
  );
}
