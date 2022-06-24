import Breadcrumbs from "../components/Shared/Breadcrumbs";
import LoginForm from "../components/Authentication/LoginForm";
import SocialLinkButtons from "../components/Authentication/SocialLinkButtons";
import FormHeader from "../components/Authentication/FormHeader";
import FormWrapper from "../components/Authentication/FormWrapper";
import FormFooter from "../components/Authentication/FormFooter";

export default function LoginPage() {
  return (
    <div>
      <Breadcrumbs paths={["Login"]} />
      <FormWrapper>
        <FormHeader title="Login" text="Login if you already have one" />
        <LoginForm />
        <SocialLinkButtons text="or login with" />
        <FormFooter text="Don't have an account?" action="Register Now" />
      </FormWrapper>
    </div>
  );
}
