import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import pl from 'tau-prolog/modules/core'
const session = pl.create(1000);
session.consult('/rules.pl', {
  success: function() {
    session.query(
      'blah(X).',
      {
        success: function() {
          session.answer({
            success: function(answer) {
              console.log(answer)
            }
          })
        }
      }
    )
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)