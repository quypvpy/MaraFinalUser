import AssignmentIcon from '@mui/icons-material/Assignment'
import CallIcon from '@mui/icons-material/Call'
import FacebookIcon from '@mui/icons-material/Facebook'
import PageviewIcon from '@mui/icons-material/Pageview'
import Avatar from '@mui/material/Avatar'
import { green } from '@mui/material/colors'
import Stack from '@mui/material/Stack'

import ClassNames from 'classnames/bind'
import styles from './Footer.module.scss'
const cx = ClassNames.bind(styles)



export function Footer() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('social')}>
        <Stack direction="row" spacing={2}>
          <Avatar sx={{ bgcolor: green[500] }}>
            <CallIcon />
          </Avatar>
          <Avatar sx={{ bgcolor: green[500] }}>
            <FacebookIcon />
          </Avatar>
          <Avatar sx={{ bgcolor: green[500] }}>
            <PageviewIcon />
          </Avatar>
          <Avatar sx={{ bgcolor: green[500] }}>
            <AssignmentIcon />
          </Avatar>
        </Stack>
      </div>
      <div className={cx('menu')}>
        <div className="">
          <div className={cx('title')}>about</div>
          <div className={cx('link')}>News</div>
          <div className={cx('link')}>About shop</div>
          <div className={cx('link')}>Contact</div>
          <div className={cx('link')}>404 error page</div>
          <div className={cx('link')}>Maintenance page</div>
        </div>
        <div className="">
          <div className={cx('title')}>customer info</div>
          <div className={cx('link')}>Payment</div>
          <div className={cx('link')}>Delivery</div>
          <div className={cx('link')}>Order tracking</div>
          <div className={cx('link')}>Exchanges & returns</div>
          <div className={cx('link')}>Terms & conditions</div>
        </div>
        <div className="">
          <div className={cx('title')}>catalogue</div>
          <div className={cx('link')}>New incomes</div>
          <div className={cx('link')}>Bestsellers</div>
          <div className={cx('link')}>Sale</div>
        </div>
      </div>
      <div className={cx('signup')}>
        <div className={cx('title')}>Newsletter signup</div>
        <div className={cx('link')}>
          Be the first to know about our new arrivals and exclusive offers!
        </div>
        <div className={cx('button-signup')}>Sign me up!</div>
      </div>
    </div>
  )
}
