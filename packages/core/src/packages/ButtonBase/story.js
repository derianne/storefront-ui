import React from "react";
import StoryWrapper from "../StoryWrapper";

function getBoth(story) {
  const button = React.cloneElement(story.component, {
    onClick: () => {
      console.log("button clicked!");
    }
  });

  const link = React.cloneElement(story.component, {
    href: "https://wikipedia.org",
    target: "_blank"
  });

  return [
    {
      name: story.name,
      component: button
    },
    {
      name: story.name + " (href)",
      component: link
    }
  ];
}

function storiesOfButton(button, options = {}) {
  const { disabled = true, loading = true } = options;

  let stories = [];

  stories.push(
    ...getBoth({
      name: "Natural Size",
      component: button
    })
  );

  stories.push(
    ...getBoth({
      name: "Size set by parent as big (width=320px, height=150px)",
      component: React.cloneElement(button, {
        sx: {
          ...button.props.sx,
          width: "320px",
          height: "150px"
        }
      })
    })
  );

  stories.push(
    ...getBoth({
      name: "Size set by parent as small (width=50px, height=50px)",
      component: React.cloneElement(button, {
        sx: {
          ...button.props.sx,
          width: "50px",
          height: "50px",
          minWidth: "1px",
          minHeight: "1px"
        }
      })
    })
  );

  if (disabled) {
    stories.push(
      ...getBoth({
        name: "Disabled",
        component: React.cloneElement(button, {
          disabled: true
        })
      })
    );
  }

  if (loading) {
    stories.push(
      ...getBoth({
        name: "Loading",
        component: React.cloneElement(button, {
          isLoading: true
        })
      })
    );
  }

  if (loading && disabled) {
    stories.push(
      ...getBoth({
        name: "Loading disabled",
        component: React.cloneElement(button, {
          isLoading: true,
          disabled: true
        })
      })
    );
  }

  return stories;
}

function storyOfButton(...args) {
  return () => <StoryWrapper stories={storiesOfButton(...args)} />;
}

export default storyOfButton;
export { storiesOfButton };
