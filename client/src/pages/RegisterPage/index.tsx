import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "hooks";

import Breadcrumbs from "components/Shared/Breadcrumbs";
import FormWrapper from "components/Authentication/FormWrapper";
import FormHeader from "components/Authentication/FormHeader";
import RegisterForm from "pages/RegisterPage/RegisterForm";
import FormFooter from "components/Authentication/FormFooter";
import ThirdPartySignIns from "components/Authentication/ThirdPartySignIns";
import NotificationMessage from "components/Shared/NotificationMessage";

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
      <Breadcrumbs crumbs={[{ label: "Register" }]} />
      <FormWrapper>
        <FormHeader
          title="Create an account"
          text="Register here if you don't have account"
        />
        <div className="mb-5">
          {error && <NotificationMessage variant="error" text={error} />}
        </div>
        <RegisterForm />
        <ThirdPartySignIns />
        <FormFooter
          text="Already have an account?"
          action="Login Now"
          href="/login"
        />
      </FormWrapper>
    </div>
  );
}
