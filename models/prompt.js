import { Schema, model, models, mongo } from 'mongoose';

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  prompt: {
    type: 'String',
    required: [true, 'Prompt is required.'],
  },
  tag: {
    type: 'String',
    required: [true, 'Tag is required.'],
  },
});

const Prompt = models.Prompt || model('Prompt', PromptSchema); //get model if exists, otherwise create the model in db based on the PromptSchema

export default Prompt;
