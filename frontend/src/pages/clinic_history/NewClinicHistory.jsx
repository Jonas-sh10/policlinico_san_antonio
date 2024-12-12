import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ClinicHistoryForm from "../../components/ClinicHistoryForm";
import { reset } from "../../features/clinic_history/clinicHistorySlice";

const NewClinicHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    return () => {
      dispatch(reset());
    };
  }, [navigate, user, dispatch]);

  return (
    <section className="container-fluid bg-secondary pt-3 pb-3 rounded text-dark">
      {/* <div className="heading container">
        <p>Gestionar Doctor</p>
      </div> */}
      <ClinicHistoryForm />
    </section>
  );
};

export default NewClinicHistory;
