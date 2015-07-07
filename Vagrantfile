ENV['VAGRANT_DEFAULT_PROVIDER'] = 'docker'
ENV['VAGRANT_NO_PARALLEL'] = 'true'
ENV["DOCKER_HOST_VAGRANT_FILE"] ||= "./docker/Dockerhost"
ENV["DOCKER_HOST_VAGRANT_NAME"] ||= "zg-site-docker-host"

# BUILD ALL WITH: vagrant up --no-parallel

Vagrant.configure("2") do |config|

  config.vm.define "frontend" do |v|

    v.vm.synced_folder ".", "/opt/app", type: "rsync",
      rsync__exclude: get_ignored_files()

    v.vm.provider "docker" do |d|
      d.vagrant_machine = ENV["DOCKER_HOST_VAGRANT_NAME"]
      d.name = "cp-frontend"
      d.vagrant_vagrantfile = ENV["DOCKER_HOST_VAGRANT_FILE"]
      d.build_dir = "."
      d.build_args = ['--tag="zehnergroup/cp-frontend"']
      # Don't set envvars here, they don't get sent to the build
      # and therefore are not very useful here
      d.remains_running = true
      d.ports = [
        "8004:8004",    # main application port
        "8384:8384",    # app debugger web port
        "5354:5354",    # app debugger socket port
      ]
    end
  end

  config.vm.define "nginx" do |v|

    v.vm.provider "docker" do |d|
      d.vagrant_machine = ENV["DOCKER_HOST_VAGRANT_NAME"]
      d.vagrant_vagrantfile = ENV["DOCKER_HOST_VAGRANT_FILE"]
      d.build_dir = "./nginx/"
      d.build_args = ['--tag="zehnergroup/cp-nginx"']
      # Don't set envvars here, they don't get sent to the build
      # and therefore are not very useful here
      d.env = {
        :EXTERNAL_HOSTNAME => 'docker.local'
      }
      d.link("cp-frontend:frontend")
      d.remains_running = true
      d.ports = ["8999:80"]
    end
  end

end

def get_ignored_files()
  ignore_file   = ".rsyncignore"
  ignore_array  = []

  if File.exists? ignore_file and File.readable? ignore_file
    File.read(ignore_file).each_line do |line|
      ignore_array << line.chomp
    end
  end

  return ignore_array
end
