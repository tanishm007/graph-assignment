import React from 'react'

import Graph_g from '../components/Graph_g'
import { GraphProvider } from '../context/context'

const Hidden = () => {
  return (
    <GraphProvider>

    <Graph_g />
    </GraphProvider>
  )
}

export default Hidden