const createCallSchema = {
  title: 'createCallSchema',
  type: 'object',
  properties: {
    origin: {
      type: 'string',
    },
    destiny: {
      type: 'string',
    },
    perHour: {
      type: 'string',
    },
    talkMore: {
      type: 'string',
      enum: ["30", "60", "120"],
    },
  },
  required: ['origin', 'destiny', 'perHour', 'talkMore'],
};

export default [
  {
    name: 'createCallSchema',
    schema: createCallSchema,
  },
];
