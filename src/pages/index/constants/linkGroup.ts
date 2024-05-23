interface LinkItem {
  label: string, // 名称
  link: string, // 链接
  icon?: string // 图标
}
interface ListItem {
  title: string, // 分组名称
  desc?: string, // 描述
  list: LinkItem[] // 列表
}

export const linkGroup: ListItem[] = [
  {
    title: 'group_name',
    desc: 'group_desc',
    list: [
      {
        label: 'link_title',
        link: 'link_url',
        icon: 'link_icon',
      }
    ]
  }
]