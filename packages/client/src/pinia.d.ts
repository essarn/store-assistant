import 'pinia'
import { Client } from 'villus'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    $villus: Client
  }
}
