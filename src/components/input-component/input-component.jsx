import { useContext, useState } from "react";
import { DataContext } from "../../contexts/data.context";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./input.styles.scss";
const TargetInput = () => {
  const { setCurrentDest, setCurrentFrom } = useContext(DataContext);
  const defaultFormField = {
    src: "United States",
    to: "",
  };
  const [formFields, setFormField] = useState(defaultFormField);
  const { src, to } = formFields;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formFields, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitted");
    setCurrentDest(to);
    setCurrentFrom(src);
  };
  return (
    <div className="input-container">
      <form onSubmit={handleSubmit}>
        <FormInput
          label="From"
          type="text"
          required
          onChange={handleChange}
          name="src"
          value={src}
        />
        <FormInput
          label="To"
          type="text"
          onChange={handleChange}
          name="to"
          value={to}
        />
        <Button type="submit">Change config</Button>
      </form>
    </div>
  );
};

export default TargetInput;
