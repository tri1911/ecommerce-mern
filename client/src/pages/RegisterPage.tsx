import FormFooter from "../components/Authentication/FormFooter";
import FormHeader from "../components/Authentication/FormHeader";
import FormWrapper from "../components/Authentication/FormWrapper";
import RegisterForm from "../components/Authentication/RegisterForm";
import SocialLinkButtons from "../components/Authentication/SocialLinkButtons";
import Breadcrumbs from "../components/Shared/Breadcrumbs";

export default function RegisterPage() {
  return (
    <div>
      <Breadcrumbs paths={["Register"]} />
      <FormWrapper>
        <FormHeader
          title="Create an account"
          text="Register here if you don't have account"
        />
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
