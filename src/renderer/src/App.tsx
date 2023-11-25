import '@fontsource/inter'
import Button from '@mui/joy/Button'
import { Avatar, Divider, Grid, Input, ModalClose, ModalDialog, Stack, Typography } from '@mui/joy'
import { Sheet } from '@mui/joy'
import { CssVarsProvider } from '@mui/joy/styles'
import './components/App.css'
import cat from './assets/cat.jpg'
import React, { useEffect, useState } from 'react'
import Modal from '@mui/joy/Modal'

function App(): JSX.Element {
  const [open, setOpen] = React.useState<boolean>(false)

  const poundsToMl = (pounds: number) => {
    return pounds * 453.592
  }

  const mlToPounds = (ml: number) => {
    return ml / 453.592
  }

  const [weights, setWeights] = useState<number[]>([])
  const [totalWeight, setTotalWeight] = React.useState(0)
  const [lastChecked, setLastChecked] = React.useState(0)
  const [lastAvgWeight, setLastAvgWeight] = React.useState(0)
  let [goal, setGoal] = React.useState(mlToPounds(770))
  const [timeSinceLastDrink, setTimeSinceLastDrink] = React.useState<Date | null>(null)
  // format the time since last drink to be HH:MM AM/PM
  let formattedTime = 'none'
  if (timeSinceLastDrink) {
    // lets also 0-pad the minutes
    formattedTime =
      (timeSinceLastDrink.getHours() % 12) +
      ':' +
      (timeSinceLastDrink.getMinutes() < 10 ? '0' : '') +
      timeSinceLastDrink.getMinutes() +
      ' ' +
      (timeSinceLastDrink.getHours() < 12 ? 'AM' : 'PM')
  }

  useEffect(() => {
    window.api.handleOutput((data) => {
      if (data.weight > 0.008) {
        setWeights((weights) => [...weights, data.weight])
      }
    })

    return () => {
      window.api.clearHandlers()
    }
  }, [])

  const Recalibrate = () => {
    window.api.zeroScale()
    setLastChecked(0)
    setLastAvgWeight(0)
    setTotalWeight(0)
    setWeights([])
  }

  useEffect(() => {
    const SamplesPerAvg = 20
    // const checkEveryNSamples = 2 * 60 * 10
    const checkEveryNSamples = 1 * 30 * 10

    // check if weights length is a multiple of 50
    if (lastChecked + SamplesPerAvg * 2 + checkEveryNSamples == weights.length) {
      if (lastAvgWeight == 0) {
        setLastAvgWeight(weights.slice(-SamplesPerAvg).reduce((a, b) => a + b, 0) / SamplesPerAvg)
      } else {
        // get current samples from the end to end - SamplesPerAvg
        const currentSamples = weights.slice(-SamplesPerAvg)

        const prevAvg = lastAvgWeight
        const currentAvg = currentSamples.reduce((a, b) => a + b, 0) / SamplesPerAvg

        const diff = Math.max(0, prevAvg - currentAvg)
        if (diff > 0.005) {
          const currentTime = new Date()
          setTotalWeight((totalWeight) => Math.min(totalWeight + diff, goal))
          setLastAvgWeight(currentAvg)
          setTimeSinceLastDrink(currentTime)
        }
      }
      setLastChecked(weights.length)
    }
  }, [weights])

  useEffect(() => {
    if (goal > 0) {
      const completion = (totalWeight / goal) * 100.0
      const progress = Math.floor(completion / 10.0)
      window.api.loadFrame(progress)
    }
  }, [goal, totalWeight])

  const category = 'happiness'
  const url = `https://api.api-ninjas.com/v1/quotes?category=${category}`
  const headers = {
    'X-Api-Key': 'Wt7p8XVIN2uHC7EPGW6D3w==pse0eemaqBIXaGIE',
    'Content-Type': 'application/json'
  }

  let [quotes, setQuotes] = React.useState('')
  let [author, setAuthor] = React.useState('')

  useEffect(() => {
    fetch(url, { method: 'GET', headers: headers }).then(async (response) => {
      const data = await response.json()
      setQuotes(data[0].quote)
      setAuthor(data[0].author)
    })
  }, [])

  return (
    <CssVarsProvider defaultMode="dark">
      <Sheet variant="plain" sx={{ maxWidth: '90%', margin: 'auto', marginTop: '20px' }}>
        <Sheet variant="soft" color="primary">
          <Stack
            direction="row"
            spacing={2}
            alignItems={'center'}
            justifyContent={'space-evenly'}
            divider={<Divider orientation="vertical" />}
            sx={{ margin: '10px', padding: '20px', marginTop: '0px' }}
          >
            <div>
              <Stack
                direction={'column'}
                spacing={1}
                alignContent={'center'}
                gap={2}
                sx={{ alignItems: 'center', paddingRight: '20px' }}
              >
                <Typography level="h1">{poundsToMl(totalWeight).toFixed(2)} mL</Typography>
                <Typography level="h3">of {poundsToMl(goal).toFixed(2)} mL goal</Typography>
              </Stack>
            </div>
            <div>
              <Stack
                direction={'column'}
                spacing={1}
                gap={2}
                sx={{ paddingLeft: '20px', paddingRight: '20px' }}
              >
                <Typography level="h3">Time since last drink: {formattedTime}</Typography>
                <Typography level="h3">
                  Current weight: ~ {poundsToMl(lastAvgWeight).toFixed(0)} mL
                </Typography>
              </Stack>
            </div>
            <div>
              <Stack direction={'row'} alignItems={'center'} gap={2} sx={{ paddingLeft: '20px' }}>
                <Avatar src={cat} size="lg" />
                <Typography level="h3">{'Effy'}</Typography>
              </Stack>
            </div>
          </Stack>
        </Sheet>
        <Grid container spacing={2} sx={{ marginTop: '20px', flexGrow: 1 }}>
          <Grid xs={5}>
            <Sheet sx={{ padding: '20px' }} variant="soft" color="primary">
              <Typography level="h2" sx={{ paddingTop: '0px', paddingBottom: '10px' }}>
                SETTINGS
              </Typography>
              {/* total # weights {weights.length}
              <br />
              Current weight: {weights[weights.length - 1]}
              <br />
              Last 50 Average: {weights.slice(-50).reduce((a, b) => a + b, 0) / 50}
              <br />
              Last Checked Avg: {lastAvgWeight}
              <br />
              Last Checked: {lastChecked}
              <br /> */}
              <Divider orientation="horizontal" sx={{ marginTop: '10px', marginBottom: '20px' }} />
              <Stack direction={'column'} spacing={2}>
                <Button onClick={() => setOpen(true)}>Change Goal</Button>
                <Button onClick={Recalibrate}>Recalibrate</Button>
              </Stack>
            </Sheet>
          </Grid>
          <Grid xs={7} sx={{ display: 'flex', flexGrow: 1 }}>
            <Sheet
              sx={{ padding: '20px', display: 'flex', alignItems: 'center' }}
              variant="soft"
              color="primary"
            >
              <Stack direction={'column'} spacing={2}>
                <Sheet
                  variant="soft"
                  color="primary"
                  sx={{
                    display: 'flex',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    justifyItems: 'center'
                  }}
                >
                  <Typography level="h2" sx={{ textAlign: 'center' }}>
                    "{quotes}"
                  </Typography>
                </Sheet>
                <Typography level="body-lg" sx={{ textAlign: 'center' }}>
                  {author}
                </Typography>
              </Stack>
            </Sheet>
          </Grid>
        </Grid>
      </Sheet>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalDialog layout="center" variant="plain">
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Sheet
            variant="plain"
            sx={{
              maxWidth: 500
            }}
          >
            {' '}
            <Typography
              component="h2"
              id="modal-title"
              level="h4"
              textColor="inherit"
              fontWeight="lg"
              mb={1}
            >
              Change Goal
            </Typography>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                const goal: string = (event.target as any).goal.value
                // check if goal string is a number
                if (isNaN(Number(goal))) {
                  alert('Goal must be a number!')
                  return
                }
                const newGoal = parseInt(goal)
                setGoal(mlToPounds(newGoal))
                setOpen(false)
              }}
            >
              <Input
                placeholder="Change Goal to..."
                name={'goal'}
                size="lg"
                sx={{ marginTop: '20px' }}
              />
              <Button type="submit" variant="soft" sx={{ marginTop: '20px' }}>
                Submit
              </Button>
            </form>
          </Sheet>
        </ModalDialog>
      </Modal>
    </CssVarsProvider>
  )
}

export default App
