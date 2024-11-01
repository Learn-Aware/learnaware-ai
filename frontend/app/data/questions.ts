interface IQuestions {
  id: number;
  text: string;
  options: {
    a: string;
    b: string;
  };
}

interface ISteps {
  title: string;
  description: string;
}

export const questions: IQuestions[] = [
  {
    id: 1,
    text: "In classes I have taken:",
    options: {
      a: "I have usually gotten to know many of the students.",
      b: "I have rarely gotten to know many of the students.",
    },
  },
  {
    id: 2,
    text: "I understand something better after I:",
    options: {
      a: "try it out.",
      b: "think it through.",
    },
  },
  {
    id: 3,
    text: "When I have to work on a group project, I first want to:",
    options: {
      a: "have group brainstorming where everyone contributes ideas.",
      b: "brainstorm individually and then come together as a group to compare ideas.",
    },
  },
  {
    id: 4,
    text: "When I am learning something new, it helps me to:",
    options: {
      a: "talk about it.",
      b: "think about it.",
    },
  },
  {
    id: 5,
    text: "In a study group working on difficult material, I am more likely to:",
    options: {
      a: "jump in and contribute ideas.",
      b: "sit back and listen.",
    },
  },
  {
    id: 6,
    text: "I prefer to study:",
    options: {
      a: "in a study group.",
      b: "alone.",
    },
  },
  {
    id: 7,
    text: "I more easily remember:",
    options: {
      a: "something I have done.",
      b: "something I have thought a lot about.",
    },
  },
  {
    id: 8,
    text: "I am more likely to be considered:",
    options: {
      a: "outgoing.",
      b: "reserved.",
    },
  },
  {
    id: 9,
    text: "When I start a homework problem, I am more likely to:",
    options: {
      a: "start working on the solution immediately.",
      b: "try to fully understand the problem first.",
    },
  },
  {
    id: 10,
    text: "The idea of doing homework in groups with one grade for the entire group:",
    options: {
      a: "appeals to me.",
      b: "does not appeal to me.",
    },
  },
  {
    id: 11,
    text: "I would rather first:",
    options: {
      a: "try things out.",
      b: "think about how I’m going to do it.",
    },
  },
  {
    id: 12,
    text: "When I am doing long calculations, I tend to:",
    options: {
      a: "repeat all my steps and check my work carefully.",
      b: "find checking my work tiresome and have to force myself to do it.",
    },
  },
  {
    id: 13,
    text: "I find it easier to learn:",
    options: {
      a: "facts.",
      b: "concepts.",
    },
  },
  {
    id: 14,
    text: "In reading nonfiction, I prefer:",
    options: {
      a: "something that teaches me new facts or tells me how to do something.",
      b: "something that gives me new ideas to think about.",
    },
  },
  {
    id: 15,
    text: "When I am reading for enjoyment, I like writers to:",
    options: {
      a: "clearly say what they mean.",
      b: "say things in creative, interesting ways.",
    },
  },
  {
    id: 16,
    text: "When I have to perform a task, I prefer to:",
    options: {
      a: "master one way of doing it.",
      b: "come up with new ways of doing it.",
    },
  },
  {
    id: 17,
    text: "If I were a teacher, I would rather teach a course:",
    options: {
      a: "that deals with facts and real-life situations.",
      b: "that deals with ideas and theories.",
    },
  },
  {
    id: 18,
    text: "I am more likely to be considered:",
    options: {
      a: "careful about the details of my work.",
      b: "creative about how to do my work.",
    },
  },
  {
    id: 19,
    text: "I prefer the idea of:",
    options: {
      a: "certainty.",
      b: "theory.",
    },
  },
  {
    id: 20,
    text: "I consider it higher praise to call someone:",
    options: {
      a: "sensible.",
      b: "imaginative.",
    },
  },
  {
    id: 21,
    text: "I prefer courses that emphasize:",
    options: {
      a: "concrete material (facts, data).",
      b: "abstract material (concepts, theories).",
    },
  },
  {
    id: 22,
    text: "I would rather be considered:",
    options: {
      a: "realistic.",
      b: "innovative.",
    },
  },
  {
    id: 23,
    text: "When I am learning a new subject, I prefer to:",
    options: {
      a: "stay focused on that subject, learning as much about it as I can.",
      b: "try to make connections between that subject and related subjects.",
    },
  },
  {
    id: 24,
    text: "I tend to:",
    options: {
      a: "understand details of a subject but may be fuzzy about its overall structure.",
      b: "understand the overall structure but may be fuzzy about details.",
    },
  },
  {
    id: 25,
    text: "It is more important to me that an instructor:",
    options: {
      a: "lay out the material in clear sequential steps.",
      b: "give me an overall picture and relate the material to other subjects.",
    },
  },
  {
    id: 26,
    text: "When solving problems in a group, I would be more likely to:",
    options: {
      a: "think of the steps in the solution process.",
      b: "think of possible consequences or applications of the solution.",
    },
  },
  {
    id: 27,
    text: "When considering a body of information, I am more likely to:",
    options: {
      a: "focus on details and miss the big picture.",
      b: "try to understand the big picture before getting into the details.",
    },
  },
  {
    id: 28,
    text: "Some teachers start their lectures with an outline of what they will cover. Such outlines are:",
    options: {
      a: "somewhat helpful to me.",
      b: "very helpful to me.",
    },
  },
  {
    id: 29,
    text: "When I am analyzing a story or novel, I:",
    options: {
      a: "think of the incidents and try to put them together to figure out the themes.",
      b: "just know what the themes are when I finish reading, and then I have to go back and find the incidents that demonstrate them.",
    },
  },
  {
    id: 30,
    text: "When I solve math problems:",
    options: {
      a: "I usually work my way to the solutions one step at a time.",
      b: "I often just see the solutions but then have to struggle to figure out the steps to get to them.",
    },
  },
  {
    id: 31,
    text: "I learn:",
    options: {
      a: "at a fairly regular pace. If I study hard, I’ll “get it.”",
      b: "in fits and starts. I’ll be totally confused and then suddenly it all “clicks.”",
    },
  },
  {
    id: 32,
    text: "When writing a paper, I am more likely to:",
    options: {
      a: "work on the beginning of the paper and progress forward.",
      b: "work on different parts of the paper and then order them.",
    },
  },
  {
    id: 33,
    text: "Once I understand:",
    options: {
      a: "all the parts, I understand the whole thing.",
      b: "the whole thing, I see how the parts fit.",
    },
  },
  {
    id: 34,
    text: "When I think about what I did yesterday, I am most likely to get:",
    options: {
      a: "a picture.",
      b: "words.",
    },
  },
  {
    id: 35,
    text: "When I meet people at a party, I am more likely to remember:",
    options: {
      a: "what they looked like.",
      b: "what they said about themselves.",
    },
  },
  {
    id: 36,
    text: "When I see a diagram or sketch in class, I am most likely to remember:",
    options: {
      a: "the picture.",
      b: "what the instructor said about it.",
    },
  },
  {
    id: 37,
    text: "I prefer to get new information in:",
    options: {
      a: "pictures, diagrams, graphs, or maps.",
      b: "written directions or verbal information.",
    },
  },
  {
    id: 38,
    text: "When I get directions to a new place, I prefer:",
    options: {
      a: "a map.",
      b: "written instructions.",
    },
  },
  {
    id: 39,
    text: "In a book with lots of pictures and charts, I am likely to:",
    options: {
      a: "look over the pictures and charts carefully.",
      b: "focus on the written text.",
    },
  },
  {
    id: 40,
    text: "I remember best:",
    options: {
      a: "what I see.",
      b: "what I hear.",
    },
  },
  {
    id: 41,
    text: "I tend to picture places I have been:",
    options: {
      a: "easily and fairly accurately.",
      b: "with difficulty and without much detail.",
    },
  },
  {
    id: 42,
    text: "I like teachers:",
    options: {
      a: "who put a lot of diagrams on the board.",
      b: "who spend a lot of time explaining.",
    },
  },
  {
    id: 43,
    text: "When someone is showing me data, I prefer:",
    options: {
      a: "charts or graphs.",
      b: "text summarizing the results.",
    },
  },
  {
    id: 44,
    text: "For entertainment, I would rather:",
    options: {
      a: "watch television.",
      b: "read a book.",
    },
  },
];

export const steps: ISteps[] = [
  {
    title: "Information Input",
    description: "Gathering data from various sources.",
  },
  {
    title: "Information Perception",
    description: "Understanding the meaning of the data.",
  },
  {
    title: "Information Understanding",
    description: "Interpreting the data in context.",
  },
  {
    title: "Information Processing",
    description: "Making decisions based on the understood data.",
  },
];
