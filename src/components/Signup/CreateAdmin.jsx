import "./Signup.css";
import { useForm } from "react-hook-form";
import { getCurrentUser, registerUser } from "../../store/Slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function CreateAdmin() {
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (details) => {
    const res = await dispatch(registerUser(details));
    if (res.type === "registerUser/fulfilled") {
      toast.success("Registered successfully");
      navigate("/signin");
    }
    await dispatch(getCurrentUser());
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className="signup">
        <div className="cont1">
          <div className="incont">
            <input
              placeholder=""
              type="text"
              required
              {...register("fullName", {
                required: true
              })}
            />
            <label>Full Name</label>
          </div>

          <div className="incont">
            <input
              name="email"
              placeholder=""
              type="email"
              required
              {...register("email", {
                required: true
              })}
            />
            <label>Email</label>
          </div>

          <div className="incont">
            <input
              name="password"
              placeholder=""
              type="password"
              required
              {...register("password", { required: true })}
            />
            <label>Password</label>
          </div>

          <div className="incont">
            <input
              name="college_id"
              placeholder="JCER***"
              type="text"
              required
              {...register("college_id", { required: true })}
            />
            <label>Admin ID</label>
          </div>

          <div className="incont rounded-lg">
            <input
              className="p-3"
              name="accountType"
              id="accountType"
              required
              defaultValue="admin"
              readOnly
              {...register("accountType", {
                required: true
              })}
            ></input>
          </div>

          <div className="incont rounded-lg">
            <input
              className="p-3"
              name="department"
              id="department"
              required
              readOnly
              defaultValue="ALL"
              {...register("department", {
                required: true
              })}
            ></input>
          </div>
        </div>

        <button type="submit">Signup</button>
      </form>
    </>
  );
}

export default CreateAdmin;
