﻿using DataModels.Wallpaper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Repository.Wallpaper
{
    internal interface IWallpaperRepository
    {
        Task<IEnumerable<WallpaperModel>> GetByCustomerIdAsync(int customerId);
    }
}