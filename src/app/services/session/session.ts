import { NewStream, SubscriptionRequest, Stream, Signal, StreamsAttribute } from "../../../app/typings/types.d.ts"
import { StreamAttributes } from "../../util/stream-attributes"

export class TbSession {
  streams: {
    activeLastDays: number
    minNumTrades: number
    minNetProfit: number
    streamAttributes: Array<StreamsAttribute>
  }

  streamsTable: {
    reverse: boolean
    predicate: StreamsAttribute
    sortBy: string
  }

  constructor() {
    "ngInject"

    this.streams = {
      "activeLastDays": 30,
      "minNumTrades": 5,
      "minNetProfit": 5,
      "streamAttributes": StreamAttributes.allAtributes()
    }

    this.streamsTable = {
    "reverse": true,
    "predicate": undefined,
    "sortBy": undefined
  }

  }

}
