'use client'

import { useState } from 'react'
import { Field, Label, Switch } from '@headlessui/react'

export default function Example() {
  const [enabled, setEnabled] = useState(false)

  return (
    <Field className="flex items-center">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 data-[checked]:bg-indigo-600"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
        />
      </Switch>
      <Label as="span" className="ml-3 text-sm">
        <span className="font-medium text-gray-900">Annual billing</span>{' '}
        <span className="text-gray-500">(Save 10%)</span>
      </Label>
    </Field>
  )
}