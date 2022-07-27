import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import FormFooter from "../components/Authentication/FormFooter";
import FormHeader from "../components/Authentication/FormHeader";
import FormWrapper from "../components/Authentication/FormWrapper";
import RegisterForm from "../components/Authentication/RegisterForm";
import SocialLinkButtons from "../components/Authentication/SocialLinkButtons";
import Breadcrumbs from "../components/Shared/Breadcrumbs";
import NotificationMessage from "../components/Shared/NotificationMessage";

export default function RegisterPage() {
  const {
    user,
    registerStatus: { error },
  } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div>
      <Breadcrumbs paths={["Register"]} />
      <FormWrapper>
        <FormHeader
          title="Create an account"
          text="Register here if you don't have account"
        />
        <div className="mb-5">
          {error && <NotificationMessage variant="error" text={error} />}
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
