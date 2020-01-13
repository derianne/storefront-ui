/** @jsx jsx */
import { jsx } from "@commerce-ui/core";
import HorizontalStack from "@commerce-ui/core/HorizontalStack";
import SelectNative from ".";
import Button from "../Button/Button";
import React, { useRef } from "react";

export const unstyled = () => {
  const inputRef = useRef(null);

  return (
    <>
      <form action={"/action"} method={"post"}>
        <h2>General</h2>

        <p>Type = text</p>
        <SelectNative type={"text"} placeholder={"First name"} />

        <p>Type = password</p>
        <SelectNative type={"password"} placeholder={"Placeholder..."} />

        <p>Type = number</p>
        <SelectNative type={"number"} placeholder={"Placeholder..."} />

        <p>Type = email</p>
        <SelectNative
          type={"email"}
          name={"email"}
          placeholder={"E-mail"}
          required
        />

        <p>Type = search</p>
        <SelectNative type={"search"} placeholder={"Placeholder..."} />

        <p>Disabled</p>
        <SelectNative
          type={"text"}
          disabled={true}
          placeholder={"Placeholder..."}
        />

        <p>Error</p>
        <SelectNative
          type={"text"}
          invalid={true}
          placeholder={"Placeholder..."}
        />

        <p>Placeholder</p>
        <SelectNative type={"text"} placeholder={"Placeholder..."} />

        <p>ref</p>

        <HorizontalStack sx={{ $gutter: "8px" }}>
          <SelectNative
            type={"text"}
            placeholder={"Placeholder..."}
            inputRef={inputRef}
          />

          <Button
            onClick={() => {
              inputRef.current.focus();
            }}
            type={"button"}
          >
            Focus
          </Button>
        </HorizontalStack>

        <p>Size</p>
        <SelectNative
          sx={{
            width: "320px",
            height: "150px"
          }}
          type={"text"}
          placeholder={"Placeholder..."}
        />

        <h2>Enhancers</h2>
        <p>Left enhancer</p>
        <SelectNative
          type={"text"}
          placeholder={"Placeholder..."}
          leftEnhancer={"$"}
        />

        <p>Left enhancer double</p>
        <SelectNative
          type={"text"}
          placeholder={"Placeholder..."}
          leftEnhancer={[<div key={1}>$</div>, <div key={2}>€</div>]}
        />

        <p>Right enhancer</p>
        <SelectNative
          type={"text"}
          placeholder={"Placeholder..."}
          rightEnhancer={"$"}
        />

        <p>Right enhancer double</p>
        <SelectNative
          type={"text"}
          placeholder={"Placeholder..."}
          rightEnhancer={[<div key={1}>$</div>, <div key={2}>€</div>]}
        />

        <p>Both enhancers</p>
        <SelectNative
          type={"text"}
          placeholder={"Placeholder..."}
          rightEnhancer={"$"}
          leftEnhancer={"$"}
        />

        <p>Both enhancers double (change of color on focus)</p>
        <SelectNative
          type={"text"}
          placeholder={"Placeholder..."}
          rightEnhancer={({ focused }) => [
            <div sx={{ color: focused ? "red" : "inherit" }} key={1}>
              $
            </div>,
            <div key={2}>€</div>
          ]}
          leftEnhancer={[<div key={1}>$</div>, <div key={2}>€</div>]}
        />

        <p>Number with enhancers</p>
        <SelectNative
          type={"number"}
          placeholder={"Placeholder..."}
          rightEnhancer={"$"}
          leftEnhancer={"$"}
        />

        <p>Search with enhancers</p>
        <SelectNative
          type={"search"}
          placeholder={"Placeholder..."}
          rightEnhancer={"$"}
          leftEnhancer={"$"}
        />

        <br />
        <br />

        <Button type={"submit"}>submit</Button>
      </form>
    </>
  );
};

export default {
  title: "SelectNative"
};
