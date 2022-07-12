import Breadcrumbs from "../components/Shared/Breadcrumbs";
import LoginForm from "../components/Authentication/LoginForm";
import SocialLinkButtons from "../components/Authentication/SocialLinkButtons";
import FormHeader from "../components/Authentication/FormHeader";
import FormWrapper from "../components/Authentication/FormWrapper";
import FormFooter from "../components/Authentication/FormFooter";
import { useAppSelector } from "../app/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NotificationMessage from "../components/Shared/NotificationMessage";

export default function LoginPage() {
  const {
    user,
    loginStatus: { error },
  } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div>
      <Breadcrumbs paths={["Login"]} />
      <FormWrapper>
        <FormHeader title="Login" text="Login if you already have one" />
        <div className="mb-5">
          {error && <NotificationMessage variant="error" message={error} />}
        </div>
        <LoginForm />
        <SocialLinkButtons text="or login with" />
        <FormFooter
          text="Don't have an account?"
          action="Register Now"
          href="/register"
        />
      </FormWrapper>
    </div>
  );
}
