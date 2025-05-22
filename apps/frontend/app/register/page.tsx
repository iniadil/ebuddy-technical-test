import Footer from "../../components/Login/Footer";
import Header from "../../components/Login/Header";
import LogicForm from "../../components/molecules/LogicForm";
import RegisterForm from "../../components/molecules/RegisterForm";

export default function LoginPage() {
  return (
    <main className="bg-white min-h-screen flex flex-col items-center justify-center">
      <Header />
      <RegisterForm />
      <Footer />
    </main>
  );
}
