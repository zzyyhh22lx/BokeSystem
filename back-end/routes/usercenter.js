const router = require('koa-router')()

const usercenterController = require('../controller/usercenter.controller')
const { verify_Write_Permission, verify_Approval_Permission } = require('../middleware/user.middleware')


router.prefix('/usercenter')

router.get('/getusers', usercenterController.getUsers)

router.post('/newcolumn', verify_Write_Permission, usercenterController.newColumn)

router.get('/getallcolumn', verify_Write_Permission, usercenterController.getAllColumn)

router.get('/getcolumnid', usercenterController.getColumnId)

router.delete('/deletecolumn', verify_Write_Permission, usercenterController.deleteColumn)

router.post('/publish', verify_Write_Permission, usercenterController.publish)

router.get('/getallarticles', usercenterController.getAllArticles)

router.get('/getcolumnarticles', usercenterController.getColumnArticles)

router.get('/getmyapprovals', verify_Write_Permission, usercenterController.getMyApprovals)

router.post('/approve', verify_Write_Permission, verify_Approval_Permission, usercenterController.approve)

router.get('/getallapprovals', verify_Write_Permission, verify_Approval_Permission, usercenterController.getAllApprovals)

router.delete('/deleteapproval',verify_Write_Permission, verify_Approval_Permission, usercenterController.deleteApproval)

module.exports = router
