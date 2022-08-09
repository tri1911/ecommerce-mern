import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "hooks";

import Breadcrumbs from "components/Shared/Breadcrumbs";
import FormWrapper from "components/Authentication/FormWrapper";
import FormHeader from "components/Authentication/FormHeader";
import LoginForm from "pages/LoginPage/LoginForm";
import FormFooter from "components/Authentication/FormFooter";
import ThirdPartySignIns from "components/Authentication/ThirdPartySignIns";
import NotificationMessage from "components/Shared/NotificationMessage";

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
      <Breadcrumbs crumbs={[{ label: "Login" }]} />
      <FormWrapper>
        <FormHeader title="Login" text="Login if you already have one" />
        <div className="mb-5">
          {error && <NotificationMessage variant="error" text={error} />}
        </div>
        <LoginForm />
        <ThirdPartySignIns />
        <FormFooter
          text="Don't have an account?"
          action="Register Now"
          href="/register"
        />
      </FormWrapper>
    </div>
  );
}
