import {
  computed,
  ref,
} from "vue"

/* */

export interface TermItem {
  id: string
  applicableFor: string
  title: string
  description: string
  mandatory: boolean
}

export interface TermPayload {
  applicableFor: string
  title: string
  description: string
  mandatory: boolean
}

/* */

export const applicableForOptions = [
  "All Purchase Orders",
  "IT Equipment",
  "Office Supplies",
  "Furniture",
  "Network Services",
  "Marketing Materials",
  "Production Supplies",
  "Quality Equipment",
  "Software",
  "Professional Services",
]

/* */

const initialTerms: TermItem[] = [
  {
    id: "01",
    applicableFor: "All Purchase Orders",
    title: "Purchase Order Acceptance",
    description:
      "The supplier is required to acknowledge and accept the purchase order before processing the requested goods or services.",
    mandatory: true,
  },

  {
    id: "02",
    applicableFor: "All Purchase Orders",
    title: "Pricing and Payment",
    description:
      "Prices stated in the purchase order shall remain valid according to the agreed quotation. Payment will be processed according to the approved company payment terms.",
    mandatory: true,
  },

  {
    id: "03",
    applicableFor: "All Purchase Orders",
    title: "Delivery Requirements",
    description:
      "Goods or services must be delivered according to the delivery date, location and requirements stated in the purchase order.",
    mandatory: true,
  },

  {
    id: "04",
    applicableFor: "All Purchase Orders",
    title: "Quality Requirements",
    description:
      "All supplied goods and services must meet the specifications, quality standards and requirements stated in the purchase order.",
    mandatory: true,
  },

  {
    id: "05",
    applicableFor: "All Purchase Orders",
    title: "Documentation",
    description:
      "The supplier shall provide the required delivery order, invoice and other supporting documents for verification and payment processing.",
    mandatory: false,
  },

  {
    id: "06",
    applicableFor: "All Purchase Orders",
    title: "Changes to Purchase Order",
    description:
      "Any changes to quantity, pricing, delivery date or specifications must receive prior approval before implementation.",
    mandatory: true,
  },

  {
    id: "07",
    applicableFor: "All Purchase Orders",
    title: "Cancellation",
    description:
      "The company may cancel a purchase order subject to the applicable procurement terms and conditions.",
    mandatory: false,
  },

  {
    id: "08",
    applicableFor: "All Purchase Orders",
    title: "Compliance",
    description:
      "Suppliers are required to comply with applicable company policies, procurement requirements and relevant laws and regulations.",
    mandatory: true,
  },

  {
    id: "09",
    applicableFor: "IT Equipment",
    title: "IT Equipment Warranty",
    description:
      "All IT equipment supplied must include the agreed warranty coverage and supporting warranty documentation from the supplier.",
    mandatory: true,
  },

  {
    id: "10",
    applicableFor: "Software",
    title: "Software Licensing",
    description:
      "Software supplied under the purchase order must include valid licensing and must be used in accordance with the applicable licensing terms.",
    mandatory: true,
  },
]

/* */

export function useTermsConditions() {
  const terms = ref<TermItem[]>(
    initialTerms.map((term) => ({
      ...term,
    })),
  )

  /* */

  const totalTerms = computed(() => {
    return terms.value.length
  })

  const mandatoryTerms = computed(() => {
    return terms.value.filter(
      (term) => term.mandatory,
    ).length
  })

  const optionalTerms = computed(() => {
    return terms.value.filter(
      (term) => !term.mandatory,
    ).length
  })

  const applicableCategories = computed(() => {
    return new Set(
      terms.value.map(
        (term) => term.applicableFor,
      ),
    ).size
  })

  /* */

  function getTerm(
    id: string,
  ) {
    return (
      terms.value.find(
        (term) => term.id === id,
      ) || null
    )
  }

  /* */

  function addTerm(
    payload: TermPayload,
  ) {
    const nextId = getNextId()

    const newTerm: TermItem = {
      id: nextId,

      applicableFor:
        payload.applicableFor,

      title:
        payload.title,

      description:
        payload.description,

      mandatory:
        payload.mandatory,
    }

    terms.value.push(newTerm)

    return newTerm
  }

  /* */

  function updateTerm(
    id: string,
    payload: TermPayload,
  ) {
    const term = getTerm(id)

    if (!term) {
      return null
    }

    Object.assign(term, {
      applicableFor:
        payload.applicableFor,

      title:
        payload.title,

      description:
        payload.description,

      mandatory:
        payload.mandatory,
    })

    return term
  }

  /* */

  function removeTerm(
    id: string,
  ) {
    const index =
      terms.value.findIndex(
        (term) => term.id === id,
      )

    if (index === -1) {
      return false
    }

    terms.value.splice(index, 1)

    return true
  }

  /* */

  function getNextId() {
    if (!terms.value.length) {
      return "01"
    }

    const numbers = terms.value
      .map((term) => {
        const number =
          Number.parseInt(
            term.id,
            10,
          )

        return Number.isNaN(number)
          ? 0
          : number
      })

    const nextNumber =
      Math.max(...numbers) + 1

    return String(
      nextNumber,
    ).padStart(2, "0")
  }

  /* */

  function getTermsByApplicability(
    applicableFor: string,
  ) {
    return terms.value.filter(
      (term) =>
        term.applicableFor ===
        applicableFor,
    )
  }

  /* */

  function resetTerms() {
    terms.value =
      initialTerms.map((term) => ({
        ...term,
      }))
  }

  return {
    /* State */
    terms,

    /* Options */
    applicableForOptions,

    /* Summary */
    totalTerms,
    mandatoryTerms,
    optionalTerms,
    applicableCategories,

    /* CRUD */
    getTerm,
    addTerm,
    updateTerm,
    removeTerm,

    /* Helpers */
    getTermsByApplicability,
    resetTerms,
  }
}