import People from './People';

type PeopleResult = {
  count: number;
  next: null | string;
  previous: null | string;
  results: People[];
};

export default PeopleResult;
