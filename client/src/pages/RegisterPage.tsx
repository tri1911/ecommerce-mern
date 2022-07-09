import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import FormFooter from "../components/Authentication/FormFooter";
import FormHeader from "../components/Authentication/FormHeader";
import FormWrapper from "../components/Authentication/FormWrapper";
import RegisterForm from "../components/Authentication/RegisterForm";
import SocialLinkButtons from "../components/Authentication/SocialLinkButtons";
import Breadcrumbs from "../components/Shared/Breadcrumbs";
import NotificationMessage from "../components/Shared/NotificationMessage";

export default function RegisterPage() {
  const authError = useAppSelector((state) => state.auth.error);
  const authStatus = useAppSelector((state) => state.auth.status);

  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus === "succeeded") {
      navigate("/", { replace: true });
    }
  }, [authStatus, navigate]);

  return (
    <div>
      <Breadcrumbs paths={["Register"]} />
      <FormWrapper>
        <FormHeader
          title="Create an account"
          text="Register here if you don't have account"
        />
        <div className="mb-5">
          {authError && <NotificationMessage message={authError} />}
        </div>
        <RegisterForm />
        <SocialLinkButtons text="or sign up with" />
        <FormFooter
          text="Already have an account?"
          action="Login Now"
          href="/login"
        />
      </FormWrapper>
    </div>
  );
}
