import App from "@/app";
import AuthRoute from "@routes/auth.route";
import IndexRoute from "@routes/index.route";
import UsersRoute from "@routes/users.route";
import validateEnv from "@utils/validateEnv";
import StudentsRoute from "@routes/students.route";
import FacultyRoute from "@routes/faculty.route";
import ParentsRoute from "@routes/parents.route";
import AdminsRoute from "@routes/admin.route";

validateEnv();

const app = new App([
  new IndexRoute(),
  new AuthRoute(),
  new UsersRoute(),
  new StudentsRoute(),
  new FacultyRoute(),
  new ParentsRoute(),
  new AdminsRoute(),
]);

app.listen();
