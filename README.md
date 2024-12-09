# MOVE Open Data Archive

## Overview

This website visualizes the CSV data published from the data archive Google Sheet. By updating the Google Sheet, the website will automatically reflect the changes. The Google Sheet can be accessed at the following link:

[Google Sheet Link](xxxxxx)

## Data Source

The data source is stored on the xxx server. When we click the "Download" button on the website, a pop-up window will display the specific file address on the server.

## Server Operations

### Connecting to the Server

To connect to the server, we can use `SSH`. Use the following applications based on our operating system:

* macOS: `Terminal`
* Windows: `Command Prompt` or `PowerShell`

Please note that connecting to this server requires using the **UCSB campus network**. If you are not within the campus network service range, you will need to download and connect to the VPN software.

Then use the following command:

```sh
ssh username@server_address
```

### Navigating the Server

Once connected to the server, we can navigate the file system using the following commands:

- **Change Directory (cd):**

  ```sh
  cd /path/to/directory
  ```

- **Create Directory (mkdir):**

  ```sh
  mkdir new_directory
  ```

- **Remove Directory (rm -r):**

  ```sh
  rm -r directory_name
  ```

### Downloading Files

To download files from the server, we can use `SFTP`. Open the Terminal application on macOS or Command Prompt/PowerShell on Windows and use the following command:

```sh
sftp username@server_address
```

Once connected, use the following command to download a file:

```sh
get /path/to/remote/file /path/to/local/directory
```

### Uploading Files

To upload files to the server, we can use `SCP`. Open the Terminal application on macOS or Command Prompt/PowerShell on Windows and use the following command:

```sh
scp /path/to/local/file username@server_address:/path/to/remote/directory
```

### Additional Notes

- Ensure that you open the Terminal or Command Prompt in the directory where the file is located when using SFTP or SCP.
- Replace `username`, `server_address`, `/path/to/local/file`, and `/path/to/remote/directory` with the actual values.

By following these instructions, you can manage files on the server and keep the website data up to date.

