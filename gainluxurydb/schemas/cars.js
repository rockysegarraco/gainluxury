import {PLANS} from '../utils/constants'
import {CONDITION} from '../utils/constants'
import {BRAND} from '../utils/constants'
import {STATE} from '../utils/constants'

export default {
  name: 'cars',
  type: 'document',
  title: 'cars',
  fields: [
    {
      name: 'addtitle',
      title: 'Add Title',
      type: 'string',
    },
    {
      name: 'aboutThisCar',
      title: 'About This Car',
      type: 'string',
    },
    {
      name: 'pricingType',
      title: 'Pricing Type',
      type: 'string',
      options: {
        list: PLANS.map(({title, value}) => ({title, value})),
        layout: 'dropdown',
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
    },
    {
      name: 'condition',
      title: 'Condition',
      type: 'string',
      options: {
        list: CONDITION.map(({title, value}) => ({title, value})),
        layout: 'radio',
      },
    },
    {
      name: 'brand',
      title: 'Brand',
      type: 'string',
      options: {
        list: BRAND.map(({title, value}) => ({title, value})),
        layout: 'dropdown',
      },
    },
    {
      name: 'model',
      title: 'Model',
      type: 'string',
    },
    {
      name: 'caryear',
      title: 'Year',
      type: 'string',
    },
    {
      name: 'kilometersRun',
      title: 'Kilometers Run',
      type: 'string',
    },
    {
      name: 'engineCapicity',
      title: 'Engine Capicty',
      type: 'string',
    },

    {
      name: 'state',
      title: 'State',
      type: 'string',
      options: {
        list: STATE.map(({title, value}) => ({title, value})),
        layout: 'dropdown',
      },
    },
    {
      name: 'zipcode',
      title: 'Zipcode',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
    },

    {
      name: 'phone',
      title: 'Phone #',
      type: 'string',
    },
    {
      name: 'whatsAppNumber',
      title: 'Whatsapp Number',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'Website',
      title: 'Website',
      type: 'url',
    },
    {
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
    },
    {
      name: 'gallery',
      type: 'array',
      title: 'Gallery',
      of: [
        { type: 'image' }
      ],
      options: {
        layout: 'grid'
      }
    }
  ],
}
