import { PLANS } from "../utils/constants";

export default {
  name: 'cars',
  type: 'document',
  title: 'cars',
  fields: [
    {
      name: 'carname',
      title: 'carmodel',
      type: 'string',
    },
    {
      name: 'caryear',
      title: 'Year',
      type: 'datetime',
    },
    {
      name: 'planSelect',
      title: 'Plan with Select dropdown',
      type: 'string',
      options: {
        list: PLANS.map(({title, value}) => ({title, value})),
        layout: 'dropdown',
      },
    },
    {
      name: 'planRadio',
      title: 'Plan with Radio button',
      type: 'string',
      options: {
        list: PLANS.map(({title, value}) => ({title, value})),
        layout: 'radio'
      },
    }
  ],
}
