export namespace CreateAppointment {
  export interface Input {
    userId: number
    start: Date
    end: Date
    description: string
    title: string
    location: string
    legend_id: number
  }
  export interface Output {
    physician_id: number
    start: Date
    end: Date
    description: string
    title: string
    location: string
    legend_id: number
    userId: number
    id: number
  }
}

export interface CreateAppointment {
  create: (input: CreateAppointment.Input) => Promise<CreateAppointment.Output>
}
