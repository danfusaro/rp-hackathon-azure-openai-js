"use client";
import Spinner from "@/app/components/spinner";
import { useChatGPT } from "@/app/lib/hooks/useChatGPT";
import { Person } from "@/app/lib/types/Person";
import React, { FC, useCallback, useEffect, useState } from "react";

const ConfigurePerson: FC<{
  onSave: (value: Person) => void;
  onRemove?: (value: Person) => void;
  onCancel?: () => void;
  initialValue?: Person;
}> = ({ onSave, onCancel, onRemove, initialValue }) => {
  const [person, setPerson] = useState<Person>(
    initialValue ?? {
      name: "",
      weightAmount: 0,
      diet: [],
      height: 0,
      age: 0,
      guid: `guid-${Date.now()}`,
      analysis: "",
      sex: "Unspecified",
    }
  );

  const { setPrompt, response, loading } = useChatGPT<{
    message: string;
    types: string[];
  }>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const copy = {
      ...person,
      [e.target.name]: e.target.value,
    };
    if (
      ["age", "height", "weightAmount", "weightUnit"].some(
        (x) => x === e.target.name
      )
    ) {
      // Invalidate analysis
      copy.analysis = "";
      copy.diet = [];
    }
    setPerson(copy);
  };

  const handleDietChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const { value, checked } = event.target;
    // if (checked) {
    //   // Add the value to the person.diet array
    //   setPerson((prevPerson) => ({
    //     ...prevPerson,
    //     diet: [...(prevPerson.diet || []), value],
    //   }));
    // } else {
    //   // Remove the value from the person.diet array
    //   setPerson((prevPerson) => ({
    //     ...prevPerson,
    //     diet: prevPerson.diet?.filter((diet) => diet !== value),
    //   }));
    // }
  };

  const handleAnalyze = useCallback(() => {
    const schema = {
      type: "object",
      properties: {
        message: {
          type: "string",
          description:
            "Your assessment of this persons health given their stats like weight, age, height, and sex.  Always suggest a minimum of 5 healthy foods this person might enjoy in your response.",
        },
        types: {
          type: "array",
          description:
            "Foods this person should include as part of their diet, these values should ALWAYS be included in the result set.  Always properly capitalize these values.",
          items: { type: "string" },
        },
      },
    };
    if (
      [person.age, person.name, person.weightAmount, person.height].every(
        (x) => !!x
      )
    ) {
      setPrompt({
        schema,
        system: `You are a professional dietician, nutritionist, and physician.  Evaluate this person's health status when they give you their profile, always include an assessment of health and a list of foods that may help this person maintain a healthy lifestyle.`,
        prompt: `My name is ${person?.name}.  I am ${person.age} years old who identifies as ${person.sex}. I weigh ${person.weightAmount} pounds and I am ${person?.height} inches tall.`,
      });
    } else {
      alert("All fields are required.");
    }
  }, [person, setPrompt]);

  useEffect(() => {
    if (response) {
      setPerson((value) => ({
        ...value,
        analysis: response?.message,
        diet: response.types,
      }));
    }
  }, [response, setPerson]);

  return (
    <div className="p-4 min-w-[35rem] bg-black">
      <h2 className="text-xl font-bold mb-4 ">Configure Person</h2>
      <form>
        <div className="mb-4">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            value={person.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="weightAmount"
          >
            Sex
          </label>
          <div className="space-y-2 space-x-3">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="sex"
                value="Male"
                checked={person.sex === "Male"}
                onChange={handleChange}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">Male</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="sex"
                value="Female"
                checked={person.sex === "Female"}
                onChange={handleChange}
                className="form-radio text-pink-600"
              />
              <span className="ml-2">Female</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="sex"
                value="Unspecified"
                checked={person.sex === "Unspecified"}
                onChange={handleChange}
                className="form-radio text-gray-600"
              />
              <span className="ml-2">Unspecified</span>
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="weightAmount"
          >
            Age
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="age"
            type="number"
            name="age"
            value={person.age}
            min={0}
            max={125}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="weightAmount"
          >
            Height (inches)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="age"
            type="number"
            name="height"
            min={12}
            max={108}
            value={person.height}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="weightAmount"
          >
            Weight Amount (pounds)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="weightAmount"
            type="number"
            name="weightAmount"
            min={0}
            max={1000}
            value={person.weightAmount}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          {loading ? <Spinner text="Analyzing..." /> : ""}

          {!loading && person?.analysis && (
            <div className="mb-4">
              <label
                className="block text-gray-400 text-sm font-bold mb-2"
                htmlFor="weightUnit"
              >
                Analysis
              </label>
              <div>{person.analysis}</div>
              <label
                className="block text-gray-400 text-sm font-bold mb-2 mt-4"
                htmlFor="weightUnit"
              >
                Suggestions
              </label>
              <div className="grid-cols-4 grid">
                {person?.diet?.map((value) => (
                  <div key={value}>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        name="diet"
                        value={value}
                        checked={true}
                        onChange={handleDietChange}
                      />
                      <span className="ml-2">{value}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between mt-8">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => onCancel?.()}
          >
            Cancel
          </button>
          <div className="flex justify-end space-x-4">
            {initialValue && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => onRemove?.(person)}
              >
                Remove
              </button>
            )}
            {person.analysis && (
              <>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => handleAnalyze()}
                >
                  Re-analyze
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => onSave(person)}
                >
                  Save
                </button>
              </>
            )}
            {!person.analysis && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => handleAnalyze()}
              >
                Analyze
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ConfigurePerson;
