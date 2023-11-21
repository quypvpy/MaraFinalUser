import Box from '@mui/material/Box'
import * as React from 'react'

export function CountDown() {
  let [dayElement, setdayElement] = React.useState(0)
  let [hourElement, sethourElement] = React.useState(0)
  let [minuteElement, setminuteElement] = React.useState(0)
  let [secondElement, setsecondElement] = React.useState(0)
  React.useEffect(() => {
    let endDate = new Date('12/24/2023 00:00:00').getTime()
    let check = setInterval(function () {
      let now = new Date().getTime()
      let distance = endDate - now

      // tổng số tg ms chia cho số  thời gian ms tương ứng với một ngàyg
      // vd chia xong ra 23.3546544 thì day là lấy làm tròn luôn
      let day = Math.floor(distance / (24 * 60 * 60 * 1000))
      // số giờ còn lại được tính dựa trên số ms còn xót lại sau khi trừ đi cho số ngày
      // và thay bằng dấy % thì lấy dc ở sau .. sau đó chia cho 1h cụ thể ở ms để tính
      // số giờ còn lại

      let hour = Math.floor((distance % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
      let minute = Math.floor((distance % (60 * 60 * 1000)) / (60 * 1000))
      let second = Math.floor((distance % (60 * 1000)) / 1000)

      setdayElement(day)
      sethourElement(hour)
      setminuteElement(minute)
      setsecondElement(second)

      if (distance <= 0) {
        setdayElement(0)
        sethourElement(0)
        setminuteElement(0)
        setsecondElement(0)
        clearInterval(check)
      }
    }, 1000)
  }, [])
  // để dependenci một lần.. chứ k hết rồi nó vẫn chạy.. ra âm.. sai

  //  1s= 1000ms
  //  1p= 60s =60*1000 ms
  // 1h =60p =60*60*1000 ms
  // 1d =24h = =24*60 p= 24*60*60 s= 24*60*60*1000 ks
  return (
    <Box
      className="countdown"
      sx={{
        display: 'flex',
        justifyContent: 'left',
        // alignItems: 'str ',
        fontSize: '25px',
        color: 'white',
        fontWeight: 'bold',
      }}
    >
      {/* <video autoPlay muted loop>
        <source src="src/video/flashsale-1-video.mp4" type="video/mp4"></source>
      </video> */}

      {dayElement > 9 ? (
        <Box
          sx={{
            marginLeft: '10px',
            width: '40px',
            backgroundColor: '#B22727',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {dayElement}
        </Box>
      ) : (
        <Box
          component={'span'}
          sx={{
            marginLeft: '10px',
            width: '40px',
            backgroundColor: '#B22727',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          0{dayElement}
        </Box>
      )}
      <Box
        component={'span'}
        sx={{
          fontSize: '16px',
          margin: '0 3px',
          color: '#B22727',
          display: 'flex',
          alignItems: 'end',
        }}
      >
        Ngày
      </Box>

      {hourElement > 9 ? (
        <Box
          component={'span'}
          sx={{
            width: '40px',
            backgroundColor: '#B22727',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {hourElement}
        </Box>
      ) : (
        <Box
          component={'span'}
          sx={{
            width: '40px',
            backgroundColor: '#B22727',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          0{hourElement}
        </Box>
      )}
      <Box
        component={'span'}
        sx={{
          fontSize: '25px',
          margin: '0 5px',
          color: '#B22727',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        :
      </Box>

      {minuteElement > 9 ? (
        <Box
          component={'span'}
          sx={{
            width: '40px',
            backgroundColor: '#B22727',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {minuteElement}
        </Box>
      ) : (
        <Box
          component={'span'}
          sx={{
            width: '40px',
            backgroundColor: '#B22727',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          0{minuteElement}
        </Box>
      )}
      <Box
        component={'span'}
        sx={{
          fontSize: '25px',
          margin: '0 5px',
          color: '#B22727',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        :
      </Box>

      {secondElement > 9 ? (
        <Box
          component={'span'}
          sx={{
            width: '40px',
            backgroundColor: '#B22727',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {secondElement}
        </Box>
      ) : (
        <Box
          component={'span'}
          sx={{
            width: '40px',
            backgroundColor: '#B22727',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          0{secondElement}
        </Box>
      )}
      <Box
        component={'span'}
        sx={{
          fontSize: '25px',
          margin: '0 5px',
          color: '#B22727',
          display: 'flex',
          alignItems: 'center',
        }}
      ></Box>
    </Box>
  )
}
