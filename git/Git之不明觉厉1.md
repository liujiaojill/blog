# 不明觉厉的git
在虚拟的计算机世界，git让我们体会到了一种不一样的感觉，也许是那种不明觉厉的高声莫测。

## 什么是git
> Git is a DISTRIBUTED VERSION CONTROL SYSTEM (DVCS)

Git是一款免费、开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。
### DVCS和CVCS的区别
下面这个图是svn的仓库，有一个中心仓库，所有的人都需要去往这个仓库里面提交代码，新的代码也需要从仓库中获得。

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1616121-bfcf8cb9e5bf5954.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

下面这个是git的模式，每一个人都有完整的仓库，虽然下面的图中还是有一个中心仓库，但是不是必须的，每个人自己都可以提交代码，互相之间可以合并代码。

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1616121-a96e0e2812e06a9e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 爹

虎父无犬子，Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

## 官网

http://git-scm.com/

## 图形界面工具

很多，我最喜欢的是[source tree](https://www.sourcetreeapp.com/).

## git入门的基本命令

下面的贴图是我的命令行工具，使用的是zsh，感兴趣的朋友可以看一下这个链接[oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)

### 获取帮助

看看如何获得帮助

#### git help

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1616121-7fbc99f441ac8372.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### git help config

如果想查询具体某个命令的帮助，可以在git help后面加上该命令

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1616121-2b099fe5ec7201bb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 配置基本信息

基本信息会保存在你提交的修改中，作为备份，所以如果我们对项目做了多少贡献，都是可以查出来的。

#### 加上自己姓名

```zsh
git config --global user.name "Yin Shen"
```

#### 加上自己邮箱
```zsh
git config --global user.email shenyin@rocketmail.com
```
#### 加上颜色
```zsh
git config --global color.ui true
```

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1616121-24343b653f0f385f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 创建仓库
现在让我们创建一个仓库来实战吧, 使用`init`命令就可以啦。
```zsh
git init 
```
![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1616121-a1380f616d087010.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## git基本概念
- 创建一个新文件的时候，该文件处于没有被追踪的状态
![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1616121-fd780f25ff052793.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 使用`add`命令，使得文件登上舞台（staging staging）
登上舞台是为了拍照，我们看一下第三个状态

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1616121-d104b211ab1d5477.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
上图的git st实际上是git status命令，被重命名了。
- 把staging staging中的东西都拍照（commit change）
被拍照的文件都有了一个snapshot（快照）

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1616121-97d8c7576cc35385.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

上面的步骤是我们使用git的一个最重要的模式：**edit/stage/commit pattern**
1. 在本地文件夹编辑文件
2. 如果想备份当前改动了，就使用`git add`命令放到舞台（stage）
3. 如果对**staged snapshot**满意，就可以commit，这样这个snapshot就变成项目历史的一部分了

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1616121-0c1092318b803a4e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

注意：add，commit命令都是对本地文件的操作，这个和SVN有很大的差别，SVN的所有操作都要和远程服务器通信，但是git是分布式的，大部分操作并不一定需要和中心仓库交互。
具体区别可以看这个链接[https://www.atlassian.com/git/tutorials/saving-changes/git-add](https://www.atlassian.com/git/tutorials/saving-changes/git-add)

### add的多种方式
```zsh
git add <list of files>   
git add --all 
git add *.txt     
git add 文件夹/*.txt       
git add 文件夹  
git add "*.txt" 
```

### 日志
可以使用`git log`