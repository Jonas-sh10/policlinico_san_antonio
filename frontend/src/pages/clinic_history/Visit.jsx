import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import VisitForm from "../../components/VisitForm";
import { reset } from "../../features/visit/visitSlice";

const Visit = () => {
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
      <VisitForm />
    </section>
  );
};

export default Visit;
