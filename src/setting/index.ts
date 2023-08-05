// 配置项目
interface settingType {
  title: string,
  logo: string,
  menuColor: string,
  menuTextColor: string,
  activeTextColor: string,
}

const setting: settingType = {
  title: 'Green Home', //平台名称
  logo: 'public/logo025.png', // logoUrl
  menuColor: '#001529', // 菜单背景色
  menuTextColor: 'white', // 菜单文字颜色
  activeTextColor: 'rgb(131, 247, 168)', // 菜单选中文字颜色
}
export default setting